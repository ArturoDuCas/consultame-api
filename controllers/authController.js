const authService = require('../services/authService');
const adminAuthService = require('../services/adminAuthService');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}


async function loginAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const { admin, token } = await adminAuthService.loginAdmin(username, password);
    res.status(200).json({ admin, token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}
module.exports = {
  login, loginAdmin
};
