const yaml = require("js-yaml");
const fs = require("fs");

const formatSource = (source) => {
  let handlerInput;
  switch (source.handler) {
    case "graphql":
      handlerInput = { "graphql": { endpoint: source.url } };
      break;
    case "openapi":
      const schemaFilePath = `./openapi-schemas/${source.name}-schema.${source.schemaFileType}`;
      fs.writeFile(schemaFilePath, source.schemaFileContent, (err) => {
        if (err) throw err;
        console.log(`Successfully created ${schemaFilePath}`);
      });

      handlerInput = { "openapi": { source: schemaFilePath } };
      break;
    case "postgraphile":
      handlerInput = { "postgraphile": { connectionString: source.url } };
      break;
    case "mongoose":
      const modelsDir = `./models/${source.name}-models`
      if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir);
      }

      const models = source.models.map(model => {
        fs.writeFile(`${modelsDir}/${model.name}.js`, model.content, (err) => {
          if (err) throw err;
          console.log(`Successfully created ${modelsDir}/${model.name}.js`);
        });

        return { name: model.name, path: `${modelsDir}/${model.name}` };
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
          console.log(`Successfully created ${schemaDir}/${op.field}.json`);
        });

        return { type: op.type, field: op.field, path: op.path, method: op.method, responseSchema: `./json-schemas/${source.name}-schemas/${op.field}.json`};
      });

      handlerInput = { "jsonSchema": { baseUrl: source.url, operations } };
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
    console.log("Successfully created .meshrc.yaml");
  })
  res.status(200).send();
}

exports.createConfig = createConfig;