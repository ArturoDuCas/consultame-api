const express = require("express");
const router = express.Router();
const AllergyControllers = require("../controllers/allergy")

router.get("/", AllergyControllers.getAllAllergies);
router.get("/available/:id", AllergyControllers.getAvailableAllergiesForUser);
router.post("/", AllergyControllers.createAllergy);

module.exports = router;