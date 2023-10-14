const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/sex", require("./sex")); 

module.exports = router; 