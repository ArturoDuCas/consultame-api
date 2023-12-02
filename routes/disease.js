const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/disease")

router.get("/chronics", diseaseController.getChronics);

module.exports = router;