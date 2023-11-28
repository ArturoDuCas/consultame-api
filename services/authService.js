const { prisma } = require("../config/db");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

if (!secretKey) {
  console.error('JWT_SECRET_KEY is not defined in the environment variables');
  process.exit(1);
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  return { user, token };
}

module.exports = {
  loginUser,
};
