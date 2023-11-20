const express = require("express");
const router = express.Router();


router.use("/user", require("./user"));
router.use("/sex", require("./sex"));
router.use("/contacts", require("./contacts"));
router.use("/relationship", require("./relationship"));
router.use("/disease", require("./disease"));
router.use("/vaccine", require("./vaccine"));
router.use("/user/vaccine", require("./user_vaccine"));
router.use("/count", require("./count"));
router.use("/allergy", require("./allergy"));
router.use("/user/allergy", require("./user_allergy"));
router.use("/allergy/type", require("./allergy_type"));
router.use("/habit", require("./habit"));
router.use("/user/habit", require("./user_habit"));
router.use("/habit/type", require("./habit_type"));

module.exports = router; 