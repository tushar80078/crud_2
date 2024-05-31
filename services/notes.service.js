const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// getNotesByTitle by id
const getNotesByTitle = async (noteTitle) => {
  const note = await prisma.notes.findFirst({
    where: { title: noteTitle },
  });
  return note;
};

// Get all notes by userid
const getNotesByUserId = async (userId) => {
  const notes = await prisma.notes.findMany({
    where: {
      userId: userId,
    },
  });
  return notes;
};

// Edit product
const editNote = async (noteId, newData) => {
  const updatedNote = await prisma.notes.update({
    where: { id: noteId },
    data: newData,
  });
  return updatedNote;
};

// Delete product by id
const deleteNoteById = async (noteId) => {
  const deleteNote = await prisma.notes.delete({
    where: { id: noteId },
  });
  return deleteNote;
};

// Create product
const createNoteService = async (noteData) => {
  const newNote = await prisma.notes.create({
    data: noteData,
  });
  return newNote;
};

module.exports = {
  getNotesByTitle,
  getNotesByUserId,
  editNote,
  deleteNoteById,
  createNoteService,
};
