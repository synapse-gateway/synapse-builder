const axios = require('axios')
const { Resolver } = require('../models/Resolver')
const { SingleQuery } = require('../models/SingleQuery')


const getIndividualQueryDataForLast = async (minutes) => {
  let mongoResponse = await SingleQuery.find({createdAt: {$gte: new Date(Date.now() - (minutes * 60 * 1000))}})
  return mongoResponse
}

const getIndividualQueryData = async (req, res, next) => {
  let queryData
  if (req.query.minutes) {
    queryData = await getIndividualQueryDataForLast(parseInt(req.query.minutes, 10))
  } else {
    queryData = await getIndividualQueryDataForLast(5)
  }
  res.status(200).json(queryData)
}


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
exports.getIndividualQueryData = getIndividualQueryData



