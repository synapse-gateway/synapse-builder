const {
  SERVICE_NAME,
  ENV_NAME,
  APP_NAME,
} = process.env

const mongourl = `mongodb://${SERVICE_NAME}.${ENV_NAME}.${APP_NAME}.local/synapse`
// const mongourl = `mongodb://${DB_USER}:${DB_PASSWORD}@0.0.0.0:`
exports.mongourl = mongourl