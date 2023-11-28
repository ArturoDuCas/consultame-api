const { prisma } = require("../config/db");

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return user;
}

module.exports = {
  loginUser,
};
