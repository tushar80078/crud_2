const notesService = require("../services/notes.service");

// ----------------------- Get All Notes By User Id -----------------------------------------

exports.getAllNotesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const notesResponse = await notesService.getNotesByUserId(userId);
    if (notesResponse) {
      return res.status(200).send({
        error: false,
        msg: "Notes Fetched Successfully",
        products: notesResponse,
      });
    }
  } catch (error) {
    next(error);
  }
};

// ----------------------- Create Notes -----------------------------------------

exports.createNote = async (req, res, next) => {
  try {
    const noteData = req.body;

    const isNoteExists = await notesService.getNotesByTitle(noteData?.title);

    if (isNoteExists) {
      return next({
        statusCode: 409,
        message: `Note already exists with given title`,
      });
    }

    const notesResponse = await notesService.createNoteService({
      title: noteData.title,
      description: noteData.description,
      userId: noteData.userId,
    });

    if (notesResponse) {
      return res.status(200).send({
        error: false,
        msg: "Note Created Successfully!!",
        product: notesResponse,
      });
    }
  } catch (error) {
    next(error);
  }
};

// ----------------------- Update Product -----------------------------------------

exports.updateNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const newData = req.body;
    const noteResponse = await notesService.editNote(noteId, {
      title: newData.title,
      description: newData.description,
    });
    return res.status(200).send({
      error: false,
      msg: "Note updated Successfully!!",
      product: noteResponse,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------- Delete Note By Id -----------------------------------------

exports.deleteNoteById = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const noteResponse = await notesService.deleteNoteById(noteId);
    return res.status(200).send({
      error: false,
      msg: "Note deleted Successfully!!",
      note: noteResponse,
    });
  } catch (error) {
    next(error);
  }
};
