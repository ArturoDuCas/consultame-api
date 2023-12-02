const express = require("express");
const router = express.Router();
const {verifyToken, createToken} = require('../services/jwt.js');


// router.use("/user", verifyToken, require("./user"));
// router.use("/sex", verifyToken,require("./sex"));
// router.use("/contacts", verifyToken,require("./contacts"));
// router.use("/relationship", verifyToken,require("./relationship"));
// router.use("/disease", verifyToken,require("./disease"));
// router.use("/vaccine", verifyToken,require("./vaccine"));
// router.use("/user/vaccine", verifyToken,require("./user_vaccine"));
// router.use("/count", verifyToken,require("./count"));
// router.use("/consultation", verifyToken,require("./consultation"));
//
//
// router.use("/allergy",verifyToken,require("./allergy"));
// router.use("/user/allergy",verifyToken, require("./user_allergy"));
// router.use("/allergy/type",verifyToken, require("./allergy_type"));
// router.use("/habit",verifyToken, require("./habit"));
// router.use("/user/habit", verifyToken, require("./user_habit"));
// router.use("/habit/type", verifyToken, require("./habit_type"));router.use("/doctors", require("./doctors"));
// router.use("/doctors/local", verifyToken, require("./doctors_local"));
// router.use("/message", verifyToken, require("./message"));
// router.use("/consultation", verifyToken, require("./consultation"));
// router.use("/family", verifyToken, require("./family"));



router.use("/user", require("./user"));
router.use("/sex",require("./sex"));
router.use("/contacts",require("./contacts"));
router.use("/relationship",require("./relationship"));
router.use("/disease",require("./disease"));
router.use("/vaccine",require("./vaccine"));
router.use("/user/vaccine",require("./user_vaccine"));
router.use("/count",require("./count"));
router.use("/consultation",require("./consultation"));


router.use("/allergy",require("./allergy"));
router.use("/user/allergy", require("./user_allergy"));
router.use("/allergy/type", require("./allergy_type"));
router.use("/habit", require("./habit"));
router.use("/user/habit", require("./user_habit"));
router.use("/habit/type", require("./habit_type"));router.use("/doctors", require("./doctors"));
router.use("/doctors/local", require("./doctors_local"));
router.use("/message", require("./message"));
router.use("/consultation", require("./consultation"));
router.use("/family", require("./family"));
module.exports = router; 