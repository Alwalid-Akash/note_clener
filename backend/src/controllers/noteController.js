const Note = require("../models/note");


// Get all notes for the logged-in user + search
exports.getNotes = async (req, res) => {
  try {
    const { search } = req.query;
    // Base query:
    // Only get notes belonging to logged-in user
    const query = {
      user: req.user._id,
    };

    // If search exists, search title OR description
    if (search && search.trim() !== "") {

      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];

    }

    const notes = await Note.find(query).sort({
      createdAt: -1,
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