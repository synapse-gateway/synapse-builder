const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api");
const cron = require('node-cron');
const mongoose = require('mongoose');

require("dotenv").config();



mongoose.connect(process.env.MONGO_DB)
  .then((res) => console.log('MONGO DB CONNECTED :)'))
  .catch((err) => console.log(err));



app.use(express.json());
app.use(cors());

const path = __dirname + "/build/";
app.use(express.static(path));

app.use("/api", routes);

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
})