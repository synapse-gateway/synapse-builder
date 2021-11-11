const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const monitoringController = require("../controllers/monitoringController");

router.post("/config", configController.createConfig)

router.get("/monitor", monitoringController.getTimeData)

module.exports = router;