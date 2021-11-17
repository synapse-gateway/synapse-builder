const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api");
let {mongourl} = require("./config/db.config")

const mongoose = require('mongoose');

require("dotenv").config();




if (process.env.PRODUCTION === 'false') {
  mongourl = "mongodb://localhost:27017/synapse"
}

mongoose.connect(mongourl)
  .then((res) => console.log('MONGO DB CONNECTED :)'))
  .catch((err) => console.log(err));



app.use(express.json());
app.use(cors());

const path = __dirname + "/build/";
app.use(express.static(path));
app.get('/monitoring', (req, res) => {
  res.sendFile(path + 'index.html');
})

app.get('/signin', (req, res) => {
  res.sendFile(path + 'index.html');
})

app.get("/signup", (req, res) => {
  res.sendFile(path + 'index.html');
})

app.get('/datasources', (req, res) => {
  res.sendFile(path + 'index.html');
})

app.get('/', (req, res) => {
  res.sendFile(path + 'index.html');
})

app.use("/api", routes);

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`server is listening on port: ${4005}`);
})
