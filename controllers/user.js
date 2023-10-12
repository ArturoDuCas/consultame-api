const UserServices = require('../services/user');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserServices.getAllUsers();
      res.status(200).json({users});
    } catch(err) {
      res.status(500).json({message: "Error al obtener los usuarios", error: err});
    }
  }
}