const { prisma } = require("../config/db");
const bcrypt = require('bcrypt');

async function registerUser(name, email, password, sexId) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      sex: {
        connect: {
          id: sexId,
        },
      },
    },
  });

  return user;
}

module.exports = {
  registerUser,
};
