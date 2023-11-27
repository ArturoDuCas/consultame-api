const { prisma } = require('../config/db');


module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include : { sex: true }
      });
      res.status(200).json(users);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los usuarios", error: err});
    }
  },

  getUserBasics: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id)
        },
        select: {
          id: true,
          name: true,
          birth_date: true,
          height: true,
          weight: true,
          blood_type: true,
        }
      });

      let age = new Date().getFullYear() - new Date(user.birth_date).getFullYear();
      user.age = age;

      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({message: "Error al obtener los datos del usuario", error: err});
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id)
        },
        include : {
          sex: true
        }
      });
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({message: "Error al obtener el usuario", error: err});
      }
    },

  createUser: async (req, res) => {
    const { password, name, email, sex_id } = req.body;
    console.log(req.body);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          sex_id: parseInt(sex_id)
        }
      });
      res.status(200).json({user});
    } catch(err) {
      res.status(500).json({message: "Error al crear el usuario", error: err});
    }
  },

  updateUserById: async (req, res) => {
    const { id } = req.params;
    try{
      const user = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          ...req.body,
          sex_id : req.body.sex_id ? parseInt(req.body.sex_id) : undefined
        }
      });
      res.status(200).json({user});
    } catch(err) {
      res.status(500).json({message: "Error al actualizar el usuario", error: err});
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      });
      res.status(200).json({user});
    } catch(err) {
      res.status(500).json({message: "Error al eliminar el usuario", error: err});
    }
  },

} //