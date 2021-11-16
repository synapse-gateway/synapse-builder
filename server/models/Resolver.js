const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ResolverSchema = new Schema({
  name: String,
  latency: Number
}, {timestamps: true})

const Resolver = mongoose.model("resolver", ResolverSchema)

exports.Resolver = Resolver
