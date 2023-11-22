const { prisma } = require("../config/db");

module.exports = {
  createMessage: async (req, res) => {
    const { message, is_from_user, created_at, consultation_id } = req.body;
    try {
      const new_message = await prisma.messages.create({
        data: {
          message,
          is_starred: false,
          is_from_user,
          created_at: new Date(created_at),
          consultation_id: parseInt(consultation_id)
        }
      });
      res.status(200).json(new_message);
    } catch(err) {
      res.status(500).json({message: "Error al crear el mensaje", error: err});
    }
  },
}