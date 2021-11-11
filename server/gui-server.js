const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api");
const cron = require('node-cron');
const mongoose = require('mongoose');
const { getResolverDurationData } = require('./jobs/pollPrometheus')
require("dotenv").config();

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_DB)
  .then((res) => console.log('MONGO DB CONNECTED :)'))
  .catch((err) => console.log(err));

const ResolutionBinSchema = new Schema(
  {
    queryInfo: String,
    resolutionTimings: Object,
    timeRangeInMinutes: Number
  },
  { timestamps: true }
)

const ResolutionBin = mongoose.model('ResolutionBin', ResolutionBinSchema)

app.use(express.json());
app.use(cors());

const path = __dirname + "/build/";
app.use(express.static(path));

app.use("/api", routes);

cron.schedule('*/1 * * * *', async () => {
  let responseObj = await getResolverDurationData(1)
  console.log('prometheus data receieved BOYYYYYY');
  for (const query in responseObj) {
    resolutionBinObj = {
      queryInfo: query,
      resolutionTimings: responseObj[query],
      timeRangeInMinutes: 1,
    }
    ResolutionBin.create(resolutionBinObj)
  }
})

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
})