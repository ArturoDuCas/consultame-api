const express = require("express");
const router = express.Router();
const familyControllers = require("../controllers/family")

router.get("/:id", familyControllers.getUserFamily);

module.exports = router;