const express = require("express");
const router = express.Router();
const AddressControllers = require("../controllers/address")


router.post("/:id", AddressControllers.createUserAddress);
router.put("/:id", AddressControllers.updateUserAddress);


module.exports = router;