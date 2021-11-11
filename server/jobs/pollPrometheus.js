const axios = require('axios')

const getResolverDurationData = async (timeRange) => {
  let durationSumData = await axios.get(`http://localhost:9090/api/v1/query?query=apollo_query_field_resolution_duration_sum[${timeRange}m]`)
  // console.log(durationSumData.data.data.result)

  let responseObj = {}
  let results = durationSumData.data.data.result
  results.forEach((point) => {
    responseObj[`${point.metric.operation}: ${point.metric.parentType}.${point.metric.fieldName}`] = point.values.map((timeArr) => [new Date(timeArr[0] * 1000), timeArr[1]])
  })
  return responseObj
}

exports.getResolverDurationData = getResolverDurationData