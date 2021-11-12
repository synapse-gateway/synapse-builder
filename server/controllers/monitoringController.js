const axios = require('axios')
const { Resolver } = require('../models/Resolver')




const getResolverDataForLast = async (minutes) => {
  let d = new Date()
  d.setMinutes(d.getMinutes() - minutes)
  let mongoResponse = await Resolver.find({created_at: {$gte: d}})
  return mongoResponse
}

const getResolverData = async (req, res, next) => {
  let resolverData
  if (req.query.minutes) {
    resolverData = await getResolverDataForLast(parseInt(req.query.minutes, 10))
  } else {
    resolverData = await getResolverDataForLast(5)
  }
  res.status(200).json(resolverData)
}

exports.getResolverData = getResolverData



