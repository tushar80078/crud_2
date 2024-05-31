const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//-------------------------  Create Admin Profile ----------------------------------------

const createUser = async (userData) => {
  const userResponse = await prisma.User.create({
    data: userData,
  });

  return userResponse;
};

//-------------------------  Get Admin ByEmailID ----------------------------------------
/**
 * @description
 * @param {*} adminData
 * @returns
 */
const getUserByUserName = async (userData) => {
  const userResponse = await prisma.User.findFirst({
    where: {
      unsername: userData,
    },
  });

  return userResponse;
};

//--------------------------- Module Exports -------------------------------------

module.exports = {
  createUser,
  getUserByUserName,
};
