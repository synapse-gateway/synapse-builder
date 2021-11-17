const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env

const mongourl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
// const mongourl = `mongodb://${DB_USER}:${DB_PASSWORD}@0.0.0.0:`
exports.mongourl = mongourl