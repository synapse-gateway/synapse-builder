const axios = require('axios')
const { ResolutionBin } = require('../models/ResolutionBin')

const fetchPrometheusData = async (timeRange) => {
  let durationSumData = await axios.get(`http://localhost:9090/api/v1/query?query=apollo_query_field_resolution_duration_sum[${timeRange}m]`)
  console.log(durationSumData.data.data.result)
  // set empty object for json response (obj)
  // data.result = array of objects corresponding to time data for 1 typ.field
  // grab data.result and iterate through (point)
  // for each --> obj[`${point.metric.parenttype}.${point.metric.fieldName}`] = point.values.map()

  let responseObj = {}
  let results = durationSumData.data.data.result
  results.forEach((point) => {
    responseObj[`${point.metric.parentType}.${point.metric.fieldName}`] = point.values.map((timeArr) => [new Date(timeArr[0] * 1000), timeArr[1]])
  })
  return responseObj
}

const getMongoData = (req, res, next) => {
  ResolutionBin.find({queryInfo: "query: AuthorsListItem.author"}).then((data) => res.status(200).json(data))
}

const getTimeData = (req, res, next) => {
  fetchPrometheusData(1).then((resData) => res.status(200).json(resData))
}

exports.fetchPrometheusData = fetchPrometheusData
exports.getTimeData = getTimeData
exports.getMongoData = getMongoData