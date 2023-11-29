const { prisma } = require('../config/db');


module.exports = {
  getChronics: async (req, res) => {
    try {
      const diseases = await prisma.disease.findMany({
        where: {
          type_id: 1
        }
      });
      res.status(200).json(diseases);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las enfermedades crónicas", error: err});
    }
  }


}