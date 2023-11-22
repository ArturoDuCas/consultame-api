const { prisma } = require("../config/db");

module.exports = {
  getAllAllergyTypes: async (req, res) => {
      try {
          const allergyTypes = await prisma.allergy_type.findMany();
          console.log("helloworld")
      res.status(200).json(allergyTypes);
    } catch(err) {
      res.status(500).json({message: "Error al obtener el tipo de alergia", error: err});
    }
  }
}