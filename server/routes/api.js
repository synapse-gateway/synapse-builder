const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");

router.post("/config", configController.createConfig)

module.exports = router;