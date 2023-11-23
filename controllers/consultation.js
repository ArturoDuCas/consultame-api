const { prisma } = require('../config/db');

module.exports = {
  createConsultation: async (req, res) => {
    const { name, description, user_id, doctor_id } = req.body;
    try {
      const consultation = await prisma.contacts.create({
        data: {
          name,
          description,
          user_id: parseInt(user_id),
          doctor_id: parseInt(doctor_id)
        }
      });
      res.status(200).json(consultation);
    }
    catch(err) {
      res.status(500).json({message: "Error al crear el una consulta", error: err});
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
