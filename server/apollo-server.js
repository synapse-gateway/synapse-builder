const { ApolloServer } = require("apollo-server");
const { getBuiltMesh } = require("./.mesh/index.js");
const { envelop, useSchema, useTiming, useLogger } = require("@envelop/core");
const { Kind } = require("graphql-compose/lib/graphql");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require("apollo-server-core");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
let { mongourl } = require("./config/db.config.js");

async function main() {
  const { schema, contextBuilder } = await getBuiltMesh();
  let queryConn;
  try {
    if (process.env.PRODUCTION === "false") {
      mongourl = "mongodb://localhost:27017/synapse";
    }
    queryConn = await mongoose.createConnection(mongourl);
  } catch (err) {
    console.error(err);
  }
  mongoose.Promise = global.Promise;

  const ResolverSchema = new Schema(
    {
      name: String,
      latency: Number,
      unixTime: Number,
    },
    { timestamps: true }
  );

  const Resolver = queryConn.model("resolver", ResolverSchema);

  const SingleQuerySchema = new Schema(
    {
      operation: String,
      latency: Number,
      rootFields: [String],
      unixTime: Number,
    },
    { timestamps: true }
  );

  const SingleQuery = queryConn.model("singleQuery", SingleQuerySchema);

  const QueryErrorsSchema = new Schema(
    {
      ip: String,
      errs: [Object],
      sourceQuery: String,
      metrics: Object,
    },
    { timestamps: true }
  );

  const QueryErrors = queryConn.model("queryErrors", QueryErrorsSchema);

  const getEnveloped = envelop({
    plugins: [
      useSchema(schema),
      useTiming({
        skipIntrospection: true,
        onExecutionMeasurement: (args, timing) => {
          singleQueryObj = { rootFields: [] };
          let operation = args.document.definitions.find(
            (def) => def.kind === Kind.OPERATION_DEFINITION
          );
          operation.selectionSet.selections.forEach((s) => {
            let fieldName = s.name.value;
            singleQueryObj.rootFields.push(fieldName);
          });

          singleQueryObj.operation = operation.operation;
          singleQueryObj.latency = timing["ms"];
          singleQueryObj.unixTime = new Date().getTime() / 1000;
          SingleQuery.create(singleQueryObj).catch((err) => console.error(err));
        },
        onResolverMeasurement: (args, timing) => {
          console.log(
            `${args.path.typename}.${args.path.key} finished in`,
            timing["ms"]
          );

          Resolver.create({
            name: `${args.path.typename}.${args.path.key}`,
            latency: timing["ms"],
            unixTime: new Date().getTime() / 1000,
          }).catch((err) => console.error(err));
        },
      }),
      useLogger({
        logFn: (eventName, args) => {
          if (eventName === "execute-end") {
            let operation = args.args.document.definitions.find(
              (def) => def.kind === Kind.OPERATION_DEFINITION
            );
          }
        },
      }),
    ],
  });

  const server = new ApolloServer({
    schema,
    context: contextBuilder,
    executor: async (requestContext) => {
      const { schema, execute, contextFactory } = getEnveloped({
        req: requestContext.request.http,
      });

      return execute({
        schema: schema,
        document: requestContext.document,
        contextValue: await contextFactory(),
        variableValues: requestContext.request.variables,
        operationName: requestContext.operationName,
      });
    },
    debug: false,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        requestDidStart(a) {
          return {
            didEncounterErrors(reqCtx) {
              QueryErrors.create({
                ip: a.context.req.ip,
                sourceQuery: reqCtx.source,
                errs: reqCtx.errors,
                metrics: reqCtx.metrics,
              });
            },
          };
        },
      },
    ],
  });

  server.listen(process.env.NODE_DOCKER_PORT || 6868).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}
main().catch((err) => console.error(err));
