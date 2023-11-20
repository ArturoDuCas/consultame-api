const { prisma } = require("../config/db");

module.exports = {
  getUserAllergies: async (req, res) => {
    const { id } = req.params;
    try {
      const userAllergies = await prisma.user_allergy.findMany({
        where: {
          user_id: parseInt(id)
        },
        include: {
          allergy: true
        }
      });
      res.status(200).json(userAllergies);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las alergias del usuario", error: err});
    }
  },

  createUserAllergy: async (req, res) => {
    const { id } = req.params;
    const { allergy_id } = req.body;

    try {
      const userAllergy = await prisma.user_allergy.create({
        data: {
          user_id: parseInt(id),
          allergy_id: parseInt(allergy_id),
        }
      });
      res.status(200).json(userAllergy);
    } catch(err) {
      res.status(500).json({message: "Error al crear la alergia del usuario", error: err});
    }
  },

  deleteUserAllergy: async (req, res) => {
    const { id } = req.params;
    const { allergy_id } = req.body;
    try {
      const userAllergy = await prisma.user_allergy.delete({
        where: {
          user_id_allergy_id: {
            user_id: parseInt(id),
            allergy_id: parseInt(allergy_id)
          }
        }
      });

      res.status(200).json(userAllergy);
    } catch(err) {
      res.status(500).json({message: "Error al eliminar la alergia del usuario", error: err});
    }
}

}