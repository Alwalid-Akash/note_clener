const express = require("express");
const router = express.Router();

const { improveNote } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/improve", authMiddleware, improveNote);

module.exports = router;