const { prisma } = require("../config/db");

module.exports = {
  getAllVaccines: async (req, res) => {
    try {
      const vaccines = await prisma.vaccine.findMany();
      res.status(200).json(vaccines);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las vacunas", error: err});
    }
  },

  createVaccine: async (req, res) => {
    const { name, description, image } = req.body;
    try {
const vaccine = await prisma.vaccine.create({
        data: {
          name,
          description,
          image
        }
      });
      res.status(200).json(vaccine);
    } catch(err) {
      res.status(500).json({message: "Error al crear la vacuna", error: err});
    }
  },


  getAvailableVaccinesForUser: async (req, res) => {
    const { id } = req.params;
    try {
      const vaccines = await prisma.vaccine.findMany({
        where: {
          user_vaccine: {
            none : {
              user_id : parseInt(id)
            }
          }
        }
      });
      res.status(200).json(vaccines);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las vacunas disponibles del usuario", error: err});
    }
  }
}