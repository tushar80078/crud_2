const express = require(`express`);
const router = express.Router();

// ----------------------------- Controller -------------------------------------

const notesController = require(`../controller/notes.controller`);

// ----------------------------- Middlewares -------------------------------------

const tokenValidation = require(`../helper/middleware/auth`);

// ----------------------------- Routes ------------------------------------------

router.post("/createNotes", tokenValidation, notesController.createNote);

router.get(
  "/getAllNotesByUserId",
  tokenValidation,
  notesController.getAllNotesByUserId
);

router.delete(
  "/deleteNoteById/:id",
  tokenValidation,
  notesController.deleteNoteById
);

router.put("/updateNote/:id", tokenValidation, notesController.updateNote);

// ----------------------------- Module Exports ----------------------------------

module.exports = router;
