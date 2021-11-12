const { ApolloServer } = require('apollo-server');
const { getBuiltMesh} = require('./.mesh/index.js');
const { envelop, useSchema, useTiming, useLogger } = require('@envelop/core')
const { Kind } = require('graphql-compose/lib/graphql');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config()


async function main() {
  const { schema, contextBuilder } = await getBuiltMesh();
  let queryConn
  try {
    queryConn = await mongoose.createConnection(process.env.MONGO_DB)
    console.log('Mongoose connected successfully!')
  } catch(err) {
    console.log(err)
  }
  
  mongoose.Promise = global.Promise

  const ResolverSchema = new Schema({
    name: String,
    latency: Number,
    unixTime: Number
  }, {timestamps: true})

  const Resolver = queryConn.model("resolver", ResolverSchema)

  const SingleQuerySchema = new Schema({
    operation: String,
    latency: Number,
    rootFields: [String],
    unixTime: Number
  }, {timestamps: true})

  const SingleQuery = queryConn.model("singleQuery", SingleQuerySchema)

  const getEnveloped = envelop({
    plugins: [
      useSchema(schema),
      useTiming({
        skipIntrospection: true,
        onExecutionMeasurement: (args, timing) => {
          console.log('WE TIMING BOY')
          
          singleQueryObj = {rootFields: []}
          let operation = args.document.definitions.find(def => def.kind === Kind.OPERATION_DEFINITION)
          //console.log(operation.operation, "TESTING BOUUUUUUUUY")
          operation.selectionSet.selections.forEach((s) => {
            let fieldName = s.name.value
            singleQueryObj.rootFields.push(fieldName)
            
          })

          singleQueryObj.operation = operation.operation
          
          singleQueryObj.latency = timing['ms']
          singleQueryObj.unixTime = new Date().getTime() / 1000
          SingleQuery.create(singleQueryObj).catch((err) => console.log(err))
        },
        onResolverMeasurement: (args, timing) => {
          console.log(`${args.path.typename}.${args.path.key} finished in`, timing['ms'])

          Resolver.create({
            name: `${args.path.typename}.${args.path.key}`,
            latency: timing['ms'],
            unixTime: new Date().getTime() / 1000
          }).catch((err) => console.log(err))
        }
      }),
      useLogger({
        logFn: (eventName, args) => {
          if (eventName === "execute-start") {
            console.log('execution of a request has started')
          } else if (eventName === "execute-end") {
            let operation = args.args.document.definitions.find(def => def.kind === Kind.OPERATION_DEFINITION)
            console.log(operation.operation, 'execution ended')
          }
        }
      }),
    ],
  })

  const server = new ApolloServer({
    schema,
    context: contextBuilder,
    executor: async requestContext => {
      const { schema, execute, contextFactory } = getEnveloped({ req: requestContext.request.http });
  
      return execute({
        schema: schema,
        document: requestContext.document,
        contextValue: await contextFactory(),
        variableValues: requestContext.request.variables,
        operationName: requestContext.operationName,
      });
    },
    plugins:[]
  });
  server.listen(process.env.PORT || 5000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}
main().catch(err => console.error(err));