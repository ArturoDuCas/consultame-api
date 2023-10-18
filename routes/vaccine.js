const express = require("express");
const router = express.Router();
const VaccineControllers = require("../controllers/vaccine")

router.get("/", VaccineControllers.getAllVaccines);
router.post("/", VaccineControllers.createVaccine);

module.exports = router;