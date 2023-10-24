const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/count")


router.get("/user", UserControllers.countUsers);
router.get("/consultation", UserControllers.countConsultations);

module.exports = router;