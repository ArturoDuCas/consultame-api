const { prisma } = require("../config/db");

module.exports = {
  getUserHabits: async (req, res) => {
    const { id } = req.params;
    try {
      const userHabits = await prisma.user_habit.findMany({
        where: {
          user_id: parseInt(id)
        },
        include: {
          habit: true
        }
      });
      res.status(200).json(userHabits);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los habitos del usuario", error: err});
    }
  },

  createUserHabit: async (req, res) => {
    const { id } = req.params;
    const { habit_id } = req.body;

    try {
      const userHabit = await prisma.user_habit.create({
        data: {
          user_id: parseInt(id),
          habit_id: parseInt(habit_id),
        }
      });
      res.status(200).json(userHabit);
    } catch(err) {
      res.status(500).json({message: "Error al crear loshabitos del usuario", error: err});
    }
  },

  deleteUserHabit: async (req, res) => {
    const { id } = req.params;
    const { habit_id } = req.body;
    try {
      const userHabit = await prisma.user_habit.delete({
        where: {
          user_id_habit_id: {
            user_id: parseInt(id),
            habit_id: parseInt(habit_id)
          }
        }
      });

      res.status(200).json(userHabit);
    } catch(err) {
      res.status(500).json({message: "Error al eliminar el habito del usuario", error: err});
    }
}

}