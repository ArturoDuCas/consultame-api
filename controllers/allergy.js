const { prisma } = require("../config/db");

module.exports = {
  getAllAllergies: async (req, res) => {
    try {
      const allergies = await prisma.allergy.findMany();
      res.status(200).json(allergies);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las alergias", error: err});
    }
  },

  createAllergy: async (req, res) => {
    const { name, description } = req.body;
    try {
const allergy = await prisma.allergy.create({
        data: {
          name,
          description
        }
      });
      res.status(200).json(allergy);
    } catch(err) {
      res.status(500).json({message: "Error al crear la alergia", error: err});
    }
  },


  getAvailableAllergiesForUser: async (req, res) => {
    const { id } = req.params;
    try {
      const allergies = await prisma.allergy.findMany({
        where: {
          user_allergy: {
            none : {
              user_id : parseInt(id)
            }
          }
        }
      });
      res.status(200).json(allergies);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las alergias disponibles del usuario", error: err});
    }
  }
}