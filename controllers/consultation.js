const { prisma } = require('../config/db');

module.exports = {

  createConsultation: async (req, res) => {
    // Extract all the possible fields for a consultation
    const { name, description, date, user_id, doctor_id, hospital_id } = req.body;
    try {
      // Create a new object with the data, ensuring to parse the user_id field to an integer
      const newData = {
        name,
        // description,
        // user_id: parseInt(user_id),
        // doctor_id: parseInt(doctor_id),
        // hospital_id: parseInt(hospital_id)
      };
  
      // Remove undefined fields
      Object.keys(newData).forEach(key => newData[key] === undefined && delete newData[key]);
      
      // If a 'date' is provided, parse it to a JavaScript Date object, assuming it's in a valid date format
      if (date) {
        newData.date = new Date(date);
      }
      
      // Create a new record in the database using Prisma
      const consultation = await prisma.consultation.create({
        data: newData
      });
      console.log("Consultation created")
      // If everything succeeded, return the created consultation as the response
      res.status(200).json(consultation);
    } catch (err) {
      // If an error occurs, return a 500 status code and an error message
      console.error("Error creating consultation:", err);
      res.status(500).json({ message: "Error creating the consultation", error: err.message });
    }
  },

  deleteConsultation: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMessages = await prisma.messages.deleteMany({
        where: {
          consultation_id: parseInt(id)
        }
      });

      const deletedConsultation = await prisma.consultation.delete({
        where: {
          id: parseInt(id)
        }
      });

      const { consultation_id, name, user_id } = deletedConsultation;
      const { count } = deletedMessages;

      res.status(200).json({consultation_id, name, user_id, deletedMessages: count });
    } catch(err) {
      res.status(500).json({message: "Error al eliminar la consulta", error: err});
    }
  },


  getAllConsultations: async (req, res) => {
    try {
      const consultations = await prisma.consultation.findMany();
      res.status(200).json(consultations);
    } catch(err) {
      res.status(500).json({message: "Error al obtener las consultas", error: err});
    }
  },
  getSpecificConsultation: async (req, res) => {
    const { id } = req.params;
    try {
      const consultation = await prisma.consultation.findMany({
        where: {
          user_id: parseInt(id)
        }
      });
      res.status(200).json(consultation);
    } catch(err) {
      res.status(500).json({message: "Error al obtener la consulta específica.", error: err});
    }
  },
}
