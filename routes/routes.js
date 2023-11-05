const express = require("express");
const router = express.Router();


router.use("/user", require("./user"));
router.use("/sex", require("./sex"));
router.use("/contacts", require("./contacts"));
router.use("/disease", require("./disease"));
router.use("/vaccine", require("./vaccine"));
router.use("/user/vaccine", require("./user_vaccine"));
router.use("/count", require("./count"));


module.exports = router; 