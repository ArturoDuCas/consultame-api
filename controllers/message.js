const { prisma } = require("../config/db");

module.exports = {
  createMessage: async (req, res) => {
    const { message, is_from_user, consultation_id } = req.body;

    let created_at = new Date();
    try {
      const new_message = await prisma.messages.create({
        data: {
          message,
          is_starred: false,
          is_from_user,
          created_at: created_at,
          consultation_id: parseInt(consultation_id)
        }
      });
      res.status(200).json(new_message);
    } catch(err) {
      res.status(500).json({message: "Error al crear el mensaje", error: err});
    }
  },

  updateMessage: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
      const updated_message = await prisma.messages.update({
        where: {
          id: parseInt(id)
        },
        data: {
          message,
        }
      });
      res.status(200).json(updated_message);
    } catch(err) {
      res.status(500).json({message: "Error al actualizar el mensaje", error: err});
    }
  },

  getMessages: async (req, res) => {
    const { id } = req.params;
    try {
      const messages = await prisma.messages.findMany({
        where: {
          consultation_id: parseInt(id)
        },
        orderBy: {
          created_at: 'asc'
        }
      });
      res.status(200).json(messages);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los mensajes", error: err});
    }
  }
}