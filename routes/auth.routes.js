const express = require(`express`);
const router = express.Router();

// ----------------------------- Controller -------------------------------------

const authController = require(`../controller/auth.controller`);

// ----------------------------- Routes ------------------------------------------

router.post(`/createUser`, authController.postCreateUser);
router.post(`/loginuser`, authController.postLoginUser);

module.exports = router;
