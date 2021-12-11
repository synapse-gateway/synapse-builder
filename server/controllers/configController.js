const yaml = require("js-yaml");
const fs = require("fs");
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const formatSource = (source) => {
  let handlerInput;
  switch (source.handler) {
    case "graphql":
      handlerInput = { graphql: { endpoint: source.url } };
      break;
    case "openapi":
      const schemaFilePath = `./openapi-schemas/${source.name}-schema.${source.schemaFileType}`;
      fs.writeFileSync(schemaFilePath, source.schemaFileContent);

      handlerInput = { openapi: { source: schemaFilePath } };
      break;
    case "postgraphile":
      handlerInput = { postgraphile: { connectionString: source.url } };
      break;
    case "mongoose":
      const modelsDir = `./models/${source.name}-models`;
      if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir);
      }

      const models = source.models.map((model) => {
        fs.writeFileSync(`${modelsDir}/${model.name}.js`, model.content);

        return { name: model.name, path: `${modelsDir}/${model.name}` };
      });

      handlerInput = { mongoose: { connectionString: source.url, models } };
      break;
    case "jsonSchema":
      const schemaDir = `./json-schemas/${source.name}-schemas`;
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir);
      }

      const operations = source.operations.map((op) => {
        fs.writeFileSync(
          `${schemaDir}/${op.field}.json`,
          op.responseSchemaContent
        );

        return {
          type: op.type,
          field: op.field,
          path: op.path,
          method: op.method,
          responseSchema: `./json-schemas/${source.name}-schemas/${op.field}.json`,
        };
      });

      handlerInput = { jsonSchema: { baseUrl: source.url, operations } };
      break;
  }

  return { name: source.name, handler: handlerInput };
};

const createConfig = (req, res, next) => {
  const sources = req.body.sources;
  const yamlContent = { sources: [] };

  sources.forEach((source) => {
    yamlContent.sources.push(formatSource(source));
  });

  fs.writeFileSync(".meshrc.yaml", yaml.dump(yamlContent));

  runCommand(`whoami`);
  runCommand(`yarn mesh build`);
  console.log("✓ Succesfully created .mesh directory");

  res.status(200).send();
};

exports.createConfig = createConfig;
