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
        success: false,
        message: "Please enter some text.",
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5000 characters allowed.",
      });
    }

    if (!validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid writing action.",
      });
    }

    const suggestion = await improveWriting(
      text.trim(),
      action
    );

    return res.status(200).json({
      success: true,
      original: text,
      suggestion,
      action,
    });
  } catch (error) {
    console.error("AI service error:", error);

    const status = error.status === 429 ? 429 : 502;

    return res.status(status).json({
      success: false,
      message:
        status === 429
          ? "AI usage limit reached. Try again later."
          : "AI service failed. Check backend logs.",
    });
  }
};

module.exports = { improveNote };