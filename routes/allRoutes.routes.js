const express = require("express");
const router = express.Router();

// ------------------- Import all routes from other routes file -------------------

const userRoutes = require("./auth.routes");
const notesRoutes = require("./notes.routes");

// -------------------- Define Parent Routes ----------------------------------------

router.use("/user", userRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
