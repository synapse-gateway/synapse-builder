const yaml = require("js-yaml");
const fs = require("fs");

const formatSource = (source) => {
  let handlerInput;
  switch (source.handler) {
    case "graphql":
      handlerInput = { "graphql": { endpoint: source.url } };
      break;
    case "openapi":
      console.log("SOURCE", source);
      const schemaFileName = `${source.name}-schema.${source.schemaFileType}`;
      fs.writeFile(`./openapi-schemas/${schemaFileName}`, source.schemaFileContent, (err) => {
        if (err) throw err;
        console.log(`Successfully created ${schemaFileName} file`);
      });

      handlerInput = { "openapi": { source: `./openapi-schemas/${schemaFileName}` } };
      break;
    case "postgraphile":
      handlerInput = { "postgraphile": { connectionString: source.url } };
      break;
    case "mongoose":
      const models = source.models.map(model => {
        fs.writeFile(`./models/${model.name}.js`, model.content, (err) => {
          if (err) throw err;
          console.log(`Successfully created ${model.name}.js file`);
        });

        return { name: model.name, path: `./models/${model.name}` };
      });

      handlerInput = { "mongoose": { connectionString: source.url, models } };
      break;
    case "jsonSchema":
      const schemaDir = `./json-schemas/${source.name}-schemas`
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir);
      }

      const operations = source.operations.map(op => {
        fs.writeFile(`${schemaDir}/${op.field}.json`, op.responseSchemaContent, (err) => {
          if (err) throw err;
          console.log(`Successfully created ${op.field}.json file`);
        });

        return { type: op.type, field: op.field, path: op.path, method: op.method, responseSchema: `./json-schemas/${source.name}-schemas/${op.field}.json`};
      });

      handlerInput = { "jsonSchema": { baseUrl: source.url, operations: source.operations } };
      break;
  };

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