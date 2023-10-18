const { prisma } = require("../config/db");

module.exports = {
  getUserVaccines: async (req, res) => {
    const { id } = req.params;
    try {
      const userVaccines = await prisma.user_vaccine.findMany({
        where: {
          user_id: parseInt(id)
        },
        include: {
          vaccine: true
        }
      });
      res.status(200).json(userVaccines);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las vacunas del usuario", error: err});
    }
  },

  createUserVaccine: async (req, res) => {
    const { id } = req.params;
    const { vaccine_id, vaccination_date } = req.body;
    try {
      const userVaccine = await prisma.user_vaccine.create({
        data: {
          user_id: parseInt(id),
          vaccine_id: parseInt(vaccine_id),
          vaccination_date : new Date(vaccination_date)
        }
      });
      res.status(200).json({userVaccine});
    } catch(err) {
      res.status(500).json({message: "Error al crear la vacuna del usuario", error: err});
    }
  }
}