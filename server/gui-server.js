const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/api");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const path = __dirname + "/build/";
app.use(express.static(path));

app.use("/api", routes);

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
})