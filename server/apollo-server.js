const { ApolloServer } = require('apollo-server');
const { getBuiltMesh } = require('./.mesh/index.js');
require('dotenv').config()
async function main() {
  const { schema, contextBuilder } = await getBuiltMesh();
  const server = new ApolloServer({
    schema,
    context: contextBuilder,
  });
  server.listen(process.env.PORT || 7000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}
main().catch(err => console.error(err));