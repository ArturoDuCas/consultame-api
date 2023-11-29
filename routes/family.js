const express = require("express");
const router = express.Router();
const familyControllers = require("../controllers/family")

router.get("/:id", familyControllers.getUserFamily);
router.delete("/:id", familyControllers.deleteFamily);


module.exports = router;