const express = require("express");
const router = express.Router();
const AllergyTypeController = require("../controllers/allergy_type");

router.get("/", AllergyTypeController.getAllAllergyTypes);

module.exports = router;
