const Note = require("../models/note");

// Get all notes for the logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    note.title = req.body.title;
    note.description = req.body.description;

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    await note.deleteOne();

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};