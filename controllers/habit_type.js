const { prisma } = require("../config/db");

module.exports = {
  getAllHabitTypes: async (req, res) => {
      try {
          const habitTypes = await prisma.habit_type.findMany();
      res.status(200).json(habitTypes);
    } catch(err) {
      res.status(500).json({message: "Error al obtener el tipo de habito", error: err});
    }
  }
}