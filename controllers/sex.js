const { prisma } = require('../config/db');


module.exports = {
  getAllSexs: async (req, res) => {
    try {
      const sexs = await prisma.sex.findMany();
      res.status(200).json(sexs);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los usuarios", error: err});
    }
  },


}