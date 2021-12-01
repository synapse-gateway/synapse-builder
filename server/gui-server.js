const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const routes = require("./routes/api");
let { mongourl } = require("./config/db.config");
const { User } = require("./models/User");

const mongoose = require("mongoose");

require("dotenv").config();

if (process.env.PRODUCTION === "false") {
  mongourl = "mongodb://localhost:27017/synapse";
}

mongoose
  .connect(mongourl)
  .then((res) => console.log("MONGO DB CONNECTED :)"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

const path = __dirname + "/build/";
app.use(express.static(path));
app.get("/errors", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/signin", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/datasources", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.use("/api", routes);

const PORT = 4005;
app.listen(PORT, async () => {
  let hasAdmin = await User.exists({ admin: true });
  if (!hasAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    try {
      await User.create({
        firstName: "Root",
        lastName: "Admin",
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        admin: true,
      });
      console.log("Admin user successfully initiated");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(`server is listening on port: ${4005}`);
});
