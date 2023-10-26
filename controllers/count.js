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
  },

  countSex: async (req, res) => {
    try {
      const sexes = await prisma.sex.findMany({
        select: {
          id: true,
          type: true,
        },
      });


      const countPromises = sexes.map(sex => {
        return prisma.user.count({
          where: {
            sex_id: sex.id,
          },
        });
      });


      const counts = await Promise.all(countPromises);


      const sexCounts = {};
      for (let i = 0; i < sexes.length; i++) {
        sexCounts[sexes[i].type] = counts[i];
      }

      // Send the counts object as the response
      return res.status(200).json(sexCounts);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error al obtener los datos de sexo",
        error: err,
      });
    }
  },

  countChronic: async (req, res) => {
    try {
      let diseases = await prisma.$queryRaw`
          SELECT
              cd.name,
              COUNT(ucd.chronic_disease_id) AS occurrences
          FROM
              user_chronic_disease ucd
                  JOIN
              chronic_disease cd ON ucd.chronic_disease_id = cd.id
          GROUP BY
              cd.name
          ORDER BY
              occurrences DESC
              LIMIT 10;
      `;

      // Convert the occurrences from BigInt to Number
      diseases = diseases.map(disease => ({
        ...disease,
        occurrences: Number(disease.occurrences),
      }));

      res.status(200).json(diseases);
      } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al obtener los datos de enfermedades cronicas", error: err});
    }
  },

  countContacts: async (req, res) => {
    try {
      let contacts = await prisma.$queryRaw`
        SELECT
              r.type,
              COUNT(c.relationship_id) AS occurrences
          FROM
              contacts c
                  JOIN
              relationship r ON r.id = c.relationship_id
          GROUP BY
              r.type
          ORDER BY
              occurrences DESC
              LIMIT 10;
      `;

      // Convert the occurrences from BigInt to Number
      contacts = contacts.map(contact => ({
        ...contact,
        occurrences: Number(contact.occurrences),
      }));

      res.status(200).json(contacts);

    } catch(err) {
console.log(err);
      res.status(500).json({message: "Error al obtener los datos de contactos", error: err});
    }
  },

  countBadHabits: async (req, res) => {
    try {
      let habits = await prisma.$queryRaw`
        SELECT
              h.name,
              COUNT(uh.habit_id) AS occurrences
          FROM
              user_habit uh
          JOIN
              habit h ON uh.habit_id = h.id
          GROUP BY
              h.name
          ORDER BY
              occurrences DESC
              LIMIT 10;
      `;

      // Convert the occurrences from BigInt to Number
      habits = habits.map(habit => ({
        ...habit,
        occurrences: Number(habit.occurrences),
      }));

      res.status(200).json(habits);
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Error al obtener los datos de malos habitos", error: err});
    }
  }

} //