const { prisma } = require('../config/db');


module.exports = {
  getUserContacts: async (req, res) => {
    const { id } = req.params;
    try {
      const contacts = await prisma.contacts.findMany({
        where: {
          user_id: parseInt(id)
        },
        include: {
          relationship: true
        }
      });
      res.status(200).json(contacts);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los contactos del usuario", error: err});
    }
  },

  createContact: async (req, res) => {
    const { contact_name, phone_number, email, relationship_id, user_id } = req.body;
    try {
      const contact = await prisma.contacts.create({
        data: {
          contact_name,
          phone_number,
          email,
          relationship_id: parseInt(relationship_id),
          user_id: parseInt(user_id)
        }
      });
      res.status(200).json(contact);
    }
    catch(err) {
      res.status(500).json({message: "Error al crear el contacto", error: err});
    }
  },

  deleteContact: async (req, res) => {
    const { id } = req.params;

    try {
      const contact = await prisma.contacts.delete({
        where: {
            id: parseInt(id),
        }
      });

      res.status(200).json(contact);
    } catch(err) {
      res.status(500).json({message: "Error al eliminar el contacto", error: err});
    }
  }

}