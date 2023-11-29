const { prisma } = require("../config/db");

module.exports = {
  getAllHabits: async (req, res) => {
    try {
      const habits = await prisma.habit.findMany();
      res.status(200).json(habits);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los habitos", error: err});
    }
  },

  createHabit: async (req, res) => {
    const { name, description } = req.body;
    try {
const habit = await prisma.habit.create({
        data: {
          name,
          description
        }
      });
      res.status(200).json(habit);
    } catch(err) {
      res.status(500).json({message: "Error al crear el habito", error: err});
    }
  },

  getAvailableHabitsForUser: async (req, res) => {
    const { id } = req.params;
    try {
      const habits = await prisma.habit.findMany({
        where: {
          user_habit: {
            none : {
              user_id : parseInt(id)
            }
          }
        }
      });
      res.status(200).json(habits);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los habitos disponibles del usuario", error: err});
    }
  },
  deleteHabit: async (req, res) => {
    const { id } = req.params;

    try {
      const habit = await prisma.habit.delete({
        where: {
            id: parseInt(id),
        }
      });

      res.status(200).json(contact);
    } catch(err) {
      res.status(500).json({message: "Error al eliminar el hábito", error: err});
    }
  }
}