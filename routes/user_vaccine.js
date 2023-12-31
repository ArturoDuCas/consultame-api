const express = require("express");
const router = express.Router();
const UserVaccineController = require("../controllers/user_vaccine");

router.get("/:id", UserVaccineController.getUserVaccines);
router.post("/:id", UserVaccineController.createUserVaccine);
router.delete("/:id", UserVaccineController.deleteUserVaccine);

module.exports = router;