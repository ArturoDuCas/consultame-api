const express = require("express");
const router = express.Router();
const CountControllers = require("../controllers/count")


router.get("/user", CountControllers.countUsers);
router.get("/consultation", CountControllers.countConsultations);
router.get("/sex", CountControllers.countSex);
router.get("/contacts", CountControllers.countContacts);
router.get("/bad_habits", CountControllers.countBadHabits);
router.get("/disease", CountControllers.countDiseases);

module.exports = router;