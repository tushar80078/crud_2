const userService = require("../services/user.service");
const authHelper = require("../helper/functions/authHelper");
const dateTimeGenerator = require("../helper/functions/timeDateGenerator");

// ----------------------- Create User Profile -----------------------------------------

exports.postCreateUser = async (req, res, next) => {
  try {
    let { unsername, password } = req.body;

    if (!unsername || !password) {
      return next({
        statusCode: 400,
        message: `Please Send Proper Data With Proper Keys. (Required fields with keys - unsername, password)`,
      });
    }

    const isUserExists = await userService.getUserByUserName(unsername);

    if (isUserExists) {
      return next({
        statusCode: 409,
        message: `User already exists with given username`,
      });
    }

    // ----------- Generating hash password ---------------------
    password = await authHelper.hashPassword(password);

    const response = await userService.createUser({
      ...req.body,
      password,
    });

    return res.status(200).send({
      error: false,
      msg: "User Created Successfully!!",
      userResponse: response,
    });
  } catch (error) {
    return next(error);
  }
};

// ----------------------- User Authentication -----------------------------------------

exports.postLoginUser = async (req, res, next) => {
  try {
    const { unsername, password } = req.body;

    if (!unsername || !password) {
      return next({
        statusCode: 400,
        message: `Please Send Proper Data With Proper Keys. (Required fields with keys - unsername, password)`,
      });
    }

    const isUserExists = await userService.getUserByUserName(unsername);

    if (!isUserExists) {
      return next({
        statusCode: 409,
        message: `User not found with given Email_Address`,
      });
    }

    let validatePassword = await authHelper.validatePassword(
      password,
      isUserExists.password
    );

    if (validatePassword) {
      const tokenObject = {
        id: isUserExists.id,
        unsername: isUserExists.unsername,
      };
      const jwtToken = await authHelper.createToken(tokenObject);
      return res.status(200).send({
        msg: "User Successfully Logged In!!",
        token: jwtToken,
        adminInfo: {
          unsername: isUserExists.unsername,
        },
      });
    } else {
      return res.status(401).send({
        msg: "You Are Not Authorized!! Password Incorrect",
      });
    }
  } catch (error) {
    return next(error);
  }
};
