const express = require("express");
const router = express.Router();
const HabitControllers = require("../controllers/habit")

router.get("/", HabitControllers.getAllHabits);
router.get("/available/:id", HabitControllers.getAvailableHabitsForUser);
router.post("/", HabitControllers.createHabit);

module.exports = router;