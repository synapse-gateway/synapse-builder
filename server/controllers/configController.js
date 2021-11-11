const yaml = require("js-yaml");
const fs = require("fs");

const formatSource = (source) => {
  let handlerInput;
  switch (source.handler) {
    case "graphql":
      handlerInput = { "graphql": { endpoint: source.url } };
      break;
    case "openapi":
      handlerInput = { "openapi": { source: source.url } };
      break;
    case "postgraphile":
      handlerInput = { "postgraphile": { connectionString: source.url } };
      break;
  }

  return { name: source.name, handler: handlerInput};
};

const createConfig = (req, res, next) => {
  const sources = req.body.sources;
  const yamlContent = { sources: [] };

  sources.forEach(source => {
    yamlContent.sources.push(formatSource(source));
  })

  fs.writeFile(".meshrc.yaml", yaml.dump(yamlContent), (err) => {
    if (err) throw err;
    console.log("Successfully created .meshrc.yaml file");
  })
  res.status(200).send();
}

exports.createConfig = createConfig;