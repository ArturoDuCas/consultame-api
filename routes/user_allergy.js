const express = require("express");
const router = express.Router();
const UserAllergyController = require("../controllers/user_allergy");

router.get("/:id", UserAllergyController.getUserAllergies);
router.post("/", UserAllergyController.createUserAllergy);
router.delete("/:id", UserAllergyController.deleteUserAllergy);

module.exports = router;