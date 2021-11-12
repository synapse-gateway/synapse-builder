const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SingleQuerySchema = new Schema({
  operation: String,
  latency: Number,
  rootFields: [String]
}, {timestamps: true})

const SingleQuery = mongoose.model("singleQuery", SingleQuerySchema)

<<<<<<< HEAD
exports.SingleQuery = SingleQuery
=======
exports.SingleQuery = SingleQuery
>>>>>>> 6a23816041db9e754694fbb6b7e1e34c87ea3558
