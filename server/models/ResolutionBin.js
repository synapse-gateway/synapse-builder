const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ResolutionBinSchema = new Schema(
  {
    queryInfo: String,
    resolutionTimings: Object,
    timeRangeInMinutes: Number
  },
  { timestamps: true }
)

const ResolutionBin = mongoose.model('ResolutionBin', ResolutionBinSchema)
exports.ResolutionBin = ResolutionBin