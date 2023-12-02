const { prisma } = require("../config/db");

module.exports = {


  createUserAddress: async (req, res) => {
    const {id} = req.params;
    const { street_line_1, street_line_2, city, state_province_region, postal_code, country, additional_info } = req.body;
    try {
      const new_address = await prisma.address.create({
        data: {
          street_line_1,
          street_line_2,
          city,
          state_province_region,
          postal_code,
          country,
          additional_info,
          user_id: parseInt(id)
        }
      });
      res.status(200).json(new_address);
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al crear la dirección del usuario", error: err});
    }
  },

  updateUserAddress: async (req, res) => {
    const { id } = req.params;
    const { street_line_1, street_line_2, city, state_province_region, postal_code, country, additional_info } = req.body;
    try {
      const updated_address = await prisma.address.update({
        where: {
          user_id: parseInt(id)
        },
        data: {
          street_line_1,
          street_line_2,
          city,
          state_province_region,
          postal_code,
          country,
          additional_info
        }
      });
      res.status(200).json(updated_address);
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al actualizar la dirección del usuario", error: err});
    }
  }
}