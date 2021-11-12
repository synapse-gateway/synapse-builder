const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api");
<<<<<<< HEAD
=======
const cron = require('node-cron');
>>>>>>> 6a23816041db9e754694fbb6b7e1e34c87ea3558
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
