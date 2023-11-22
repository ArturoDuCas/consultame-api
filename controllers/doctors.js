const { prisma } = require('../config/db');


module.exports = {
  getGlobalDoctors: async (req, res) => {
    try {
      const doctors = await prisma.doctor.findMany();
      const doctorNames = doctors.map(doctor => doctor.name);
      res.status(200).json(doctorNames);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los doctores", error: err});
    }
  },
  getLocalDoctors: async (req, res) => {
    const { id } = req.params;
    try {
      const userDoctors = await prisma.user_doctor_local.findMany({
        where: {
          user_id: parseInt(id)
        },
        include: {
          doctor_local: true
        }
      });
      res.status(200).json(userDoctors);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los doctores locales del usuario", error: err});
    }
  },

}