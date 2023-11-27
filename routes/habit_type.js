const express = require("express");
const router = express.Router();
const HabitTypeController = require("../controllers/habit_type");

router.get("/", HabitTypeController.getAllHabitTypes);

module.exports = router;
