const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("express-jwt");
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
require("dotenv").config()

const configController = require("../controllers/configController");
const monitoringController = require("../controllers/monitoringController");
const { User } = require("../models/User")


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] // bearer <token>
  const token = authHeader && authHeader.split(' ')[1] 
  if (token == null) return res.sendStatus(401)

  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    console.log('made it here HOMIE')
    next()
  })
}

// const testJWT = (req, res) => {
//   res.status(200).json({message: "IT WORKED :)"})
// }

router.post("/config", configController.createConfig)

router.get("/monitor/resolvers", authenticateToken, monitoringController.getResolverData)

router.get("/monitor/queries", authenticateToken, monitoringController.getIndividualQueryData)

// router.get("/testjwt", authenticateToken, testJWT)

// Create new user
router.post('/users', async (req, res) => {
  try {
    console.log(req.body, "HERE ANEESH RIGHT HERE")
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName};
    console.log(user)
    let userObj = await User.create(user); // push to "real" database
    res.status(201).json({token: jsonwebtoken.sign({user: userObj._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10h'})})
  } catch(err) {
    console.log(err)
    res.status(500).json({error: "Something went wrong"});
  }
});


// Authenticate login
router.post('/users/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username}); // find user from "real" database
  if (!user) {
    return res.status(400).send('User does not exist');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Give back JWT
      console.log(user._id)

      res.status(201).json({token: jsonwebtoken.sign({user: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10h'})})
    } else {
      res.status(401).json({error: 'Login Failed'});
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({error: err})
  }
});

module.exports = router;
