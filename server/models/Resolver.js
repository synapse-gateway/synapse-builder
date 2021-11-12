const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ResolverSchema = new Schema({
  name: String,
  latency: Number
}, {timestamps: true})

const Resolver = mongoose.model("resolver", ResolverSchema)

<<<<<<< HEAD
exports.Resolver = Resolver
=======
exports.Resolver = Resolver
>>>>>>> 6a23816041db9e754694fbb6b7e1e34c87ea3558
