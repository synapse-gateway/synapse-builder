const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SingleQuerySchema = new Schema({
  operation: String,
  latency: Number,
  rootFields: [String]
}, {timestamps: true})

const SingleQuery = mongoose.model("singleQuery", SingleQuerySchema)


exports.SingleQuery = SingleQuery
