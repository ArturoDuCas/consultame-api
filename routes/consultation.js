const express = require("express");
const router = express.Router();
const ConsultControllers = require("../controllers/consultation")

router.get("/all", ConsultControllers.getAllConsultations);
router.get("/:id", ConsultControllers.getConsultations);


module.exports = router;


