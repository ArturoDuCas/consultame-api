const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  login,
};
