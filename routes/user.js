const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user")

router.get("/", UserControllers.getAllUsers);

module.exports = router;