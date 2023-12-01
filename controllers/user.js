const { id } = require('date-fns/locale');
const { prisma } = require('../config/db');
const { createToken } = require('../Authorization/jwt.js')

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
      if (user.birth_date){
        let age = new Date().getFullYear() - new Date(user.birth_date).getFullYear();
        user.age = age.toString();
      }
      
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

    const {name, email, password, sex_id } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          sex_id: parseInt(sex_id)
        }
      });
      const user_id = user.id
      const jwt = createToken(user_id)
      const response = {
        user_id: user_id,
        token: jwt
      }
      console.log("Created user: " + JSON.stringify(response))
      res.status(200).json(response);
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

  getUserDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const userId = parseInt(id);
      const user = await prisma.user.findUnique({
        where: { id: userId },
          select: {
           email: true,
           name: true,
           birth_date: true,
           phone_number: true,
           sex: true,
           height: true,
           weight: true,
           blood_type: true
         }
      });

  
      const addresses = await prisma.address.findMany({
        where: { user_id: userId },
        select: {
          id: true,
          street_line_1: true,
          street_line_2: true,
          city: true,
          state_province_region: true,
          postal_code: true,
          country: true,
          additional_info: true
        }
      });
  
      const userDetails = { addresses, user };
      
  
      res.status(200).json({ ...user, addresses});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener los detalles del usuario", error: err.message });
    }
  },
  


  createUserWithDetails: async (req, res) => {
    const { name, email, password, sex_id, address } = req.body; 
  
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          sex_id: parseInt(sex_id),
          address: {
            create: address 
          }
        },
        include: {
          address: true
        }
      });
      res.status(200).json(newUser);
    } catch(err) {
      console.log(err); 
      res.status(500).json({message: "Error al crear el usuario con detalles", error: err});
    }
  }

  
}
