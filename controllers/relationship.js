const { prisma } = require('../config/db');


module.exports = {
  getAllRelationships: async (req, res) => {
    try {
      const relationships = await prisma.relationship.findMany();
      res.status(200).json(relationships);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los tipos de relacion", error: err});
    }
  }

}