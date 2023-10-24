const { prisma } = require('../config/db');
const { format } = require('date-fns');


module.exports = {
  countUsers: async (req, res) => {
    try {
      // Obtener el número total de usuarios
      const totalUsers = await prisma.user.count();


      // Obtener el número de usuarios registrados en los últimos 7 días
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const newUsersThisWeek = await prisma.user.count({
        where: {
          created_at: {
            gte: sevenDaysAgo
          }
        }
      });

      // obtener el número de usuarios registrados en los últimos 14 días
      const forteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const newUsersPastWeek = await prisma.user.count({
        where: {
          created_at: {
            gte: forteenDaysAgo,
          }
        }
      });


      res.status(200).json({ totalUsers, newUsersThisWeek, newUsersPastWeek: newUsersPastWeek - newUsersThisWeek });

    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al obtener los usuarios", error: err});
    }
  },

  countConsultations: async (req, res) => {
    try {
// Obtener el numero total de consultas
      const totalConsultations = await prisma.consultation.count();

      // Obtener el número de consultas en los últimos 7 días
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const newConsultationsThisWeek = await prisma.consultation.count({
        where: {
          created_at: {
            gte: sevenDaysAgo
          }
        }
      });

      // Obtener el número de consultas en los últimos 14 días
      const forteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const newConsultationsPastWeek = await prisma.consultation.count({
        where: {
          created_at: {
            gte: forteenDaysAgo
          }
        }
      });

      res.status(200).json({ totalConsultations, newConsultationsThisWeek, newConsultationsPastWeek: newConsultationsPastWeek - newConsultationsThisWeek });

      } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al obtener las consultas", error: err});
    }
  }
} //