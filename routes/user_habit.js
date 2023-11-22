const express = require("express");
const router = express.Router();
const UserHabitController = require("../controllers/user_habit");

router.get("/:id", UserHabitController.getUserHabits);
router.post("/:id", UserHabitController.createUserHabit);
router.delete("/:id", UserHabitController.deleteUserHabit);

module.exports = router;