const { prisma } = require("../config/db");

async function registerUser(name, email, password, sexId) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
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
