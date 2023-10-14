const express = require("express");
const router = express.Router();
const SexControllers = require("../controllers/sex")

router.get("/", SexControllers.getAllSexs);

module.exports = router;