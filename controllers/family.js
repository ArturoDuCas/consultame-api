const { prisma } = require("../config/db");

module.exports = {
    getUserFamily: async (req, res) => {
        const { id } = req.params;
        try {
            const family = await prisma.family_medical_history.findMany({
                where: {
                    user_id: parseInt(id)
                },
              select : {
                id: true,
                diagnosis_date: true,
                description: true,
                chronic_disease: {
                  select: {
                    id: true,
                    name: true,
                  }
                },
                relationship: {
                  select: {
                    id: true,
                    type: true,
                  }
                },
                }
            });
            res.status(200).json(family);
        } catch(err) {
            res.status(500).json({message: "Error al obtener la familia del usuario", error: err});
        }
    },

    createFamily: async (req, res) => {
        const { user_id, chronic_disease_id, relationship_id, description, diagnosis_date } = req.body;
        try {
            const family = await prisma.family_medical_history.create({
                data: {
                    user_id: parseInt(user_id),
                    chronic_disaese_id: parseInt(chronic_disease_id),
                    relationship_id: parseInt(relationship_id),
                    description,
                    diagnosis_date,
                }
            });
            res.status(200).json(family);
        } catch(err) {
          console.log(err)
            res.status(500).json({message: "Error al crear la familia del usuario", error: err});
        }
    },


    deleteFamily: async (req, res) => {
      const { id } = req.params;
  
      try {
        const family = await prisma.family_medical_history.delete({
          where: {
              id: parseInt(id),
          }
        });
  
        res.status(200).json(family);
      } catch(err) {
        res.status(500).json({message: "Error al eliminar el historial médico", error: err});
      }
    },
}