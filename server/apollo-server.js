const { ApolloServer } = require('apollo-server-express');
const { getBuiltMesh } = require('./.mesh/index.js');
const {
  createPrometheusExporterPlugin,
} = require("@bmatei/apollo-prometheus-exporter");
const express = require("express");
const client = require("prom-client");

const app = express();

const prometheusExporterPlugin = createPrometheusExporterPlugin({ app });

require('dotenv').config()
const register = new client.Registry();

register.setDefaultLabels({
  app: "nodejs-meshdemo",
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

async function main() {
  const { schema, contextBuilder } = await getBuiltMesh();
  const server = new ApolloServer({
    schema,
    context: contextBuilder,
    plugins: [prometheusExporterPlugin],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server ready`);
  });
}

main().catch(err => console.error(err));