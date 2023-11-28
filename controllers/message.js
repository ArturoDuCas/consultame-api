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

  getMessages: async (req, res) => {
    const { consultation_id } = req.params; // Assuming you are getting consultation_id from the route parameter
    
    try {
      // Check if consultation_id is provided, if not send a 400 Bad Request response.
      if (!consultation_id) {
        return res.status(400).json({ message: "Consultation ID is required" });
      }
      
      // Try to parse consultation_id to an integer. If parsing fails, send a 400 Bad Request response.
      const parsedConsultationId = parseInt(consultation_id);
      if (isNaN(parsedConsultationId)) {
        return res.status(400).json({ message: "Consultation ID must be a valid integer" });
      }

      // Use Prisma client to fetch the messages with the given consultation id.
      const messages = await prisma.messages.findMany({
        where: {
          consultation_id: parsedConsultationId
        },
        orderBy: {
          created_at: 'asc' // Assuming you want the messages in chronological order
        }
      });
      
      // Return the messages in a JSON format with a 200 OK response.
      res.status(200).json(messages);
    } catch(err) {
      // If there's any error during database read operation, send a 500 Internal Server Error response.
      res.status(500).json({message: "Error al obtener los mensajes", error: err});
    }
  }

}