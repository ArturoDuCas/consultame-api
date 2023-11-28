const express = require("express");
const router = express.Router();
const ConsultationControllers = require("../controllers/consultation");


router.get("/", ConsultationControllers.getAllConsultations);
router.post("/", ConsultationControllers.createConsultation);
router.get("/:id", ConsultationControllers.getSpecificConsultation);
router.delete("/:id", ConsultationControllers.deleteConsultation);


module.exports = router;
