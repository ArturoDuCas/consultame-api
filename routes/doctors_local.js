const express = require("express");
const router = express.Router();
const doctorsControllers = require("../controllers/doctors")

router.get("/:id", doctorsControllers.getLocalDoctors);

module.exports = router;