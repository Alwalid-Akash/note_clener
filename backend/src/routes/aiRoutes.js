const express = require("express");
const router = express.Router();

const {
  improveNote
} = require("../controllers/aiController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

// Protected AI Writing Assistant route
router.post(
  "/improve",
  authMiddleware,
  improveNote
);

module.exports = router;