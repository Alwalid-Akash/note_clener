const { improveWriting } = require("../services/aiService");

const improveNote = async (req, res) => {
  try {
    const { text, action } = req.body;

    const validActions = [
      "grammar",
      "improve",
      "professional",
      "summarize",
    ];

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        message: "Text must be under 5000 characters",
      });
    }

    if (!validActions.includes(action)) {
      return res.status(400).json({
        message: "Invalid AI action",
      });
    }

    const suggestion = await improveWriting(
      text.trim(),
      action
    );

    return res.status(200).json({
      original: text,
      suggestion,
      action,
    });

  } catch (error) {
    console.error("AI error:", error.message);

    const status = error.status === 429 ? 429 : 502;

    return res.status(status).json({
      message:
        status === 429
          ? "AI usage limit reached. Please try again later."
          : "AI service is unavailable. Please try again.",
    });
  }
};

module.exports = { improveNote };