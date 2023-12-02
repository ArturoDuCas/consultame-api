const { prisma } = require("../config/db");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

if (!secretKey) {
  console.error('JWT_SECRET_KEY is not defined in the environment variables');
  process.exit(1);
}

async function loginAdmin(username, password) {
  const admin = await prisma.userAdmin.findUnique({
    where: {
      username,
    },
  });

  if (!admin) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: admin.id }, secretKey, { expiresIn: '1h' });

  return { admin, token };
}


module.exports = {
  loginAdmin,
};