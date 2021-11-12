const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const monitoringController = require("../controllers/monitoringController");

router.post("/config", configController.createConfig)

router.get("/monitor/resolvers", monitoringController.getResolverData)

router.get("/monitor/queries", monitoringController.getIndividualQueryData)

module.exports = router;