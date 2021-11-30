const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const QueryErrorsSchema = new Schema({
  ip: String,
  errs: [Object],
  sourceQuery: String,
  metrics: Object,
}, {timestamps: true})

const QueryErrors = mongoose.model('queryErrors', QueryErrorsSchema)

exports.QueryErrors = QueryErrors