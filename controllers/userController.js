const userService = require('../services/userService');

async function register(req, res) {
  try {
    const { name, email, password, sex } = req.body;
    const user = await userService.registerUser(name, email, password, sex);
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
  register,
};
