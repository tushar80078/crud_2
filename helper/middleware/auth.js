const jwt = require("jsonwebtoken");
const config = require("../config/config");

let flag = true;

const auth = async (req, res, next) => {
  if (flag == true) {
    try {
      if (req.header("Authorization")) {
        const token = req.header("Authorization").replace("bearer ", "");
        const decoded = jwt.verify(token, config.auth.secret);

        try {
          let userInfo = {
            userId: decoded.data.id,
            unsername: decoded.data.unsername,
          };
          req.body = { ...req.body, ...userInfo };
        } catch (error) {
          throw {
            statusCode: 502,
            message:
              "Something went wrong while accessing admin information from JSON web token",
          };
        }
      } else {
        throw { statusCode: 401, message: "Unauthorize user." };
      }
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next();
  }
};

module.exports = auth;
