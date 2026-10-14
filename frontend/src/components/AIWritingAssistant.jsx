import { useState } from "react";
import api from "../api/api.js";

function AIWritingAssistant({ text, onAccept }) {
  const [suggestion, setSuggestion] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAI = async (action) => {
    if (!text?.trim()) {
      setError("Please write something first.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to use the AI assistant.");
      return;
    }

    const currentText = text;

    setLoading(true);
    setError("");
    setSuggestion("");
    setSourceText(currentText);

    try {
      const res = await api.post("/ai/improve", {
        text: currentText,
        action,
      });

      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("AI request failed:", err);

      if (err.response?.status === 401) {
        setError("Your session is invalid. Please log in again.");
      } else if (err.response?.status === 429) {
        setError("AI usage limit reached. Try again later.");
      } else {
        setError(
          err.response?.data?.message ||
          "AI request failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (!suggestion || text !== sourceText) {
      setError(
        "Your note changed. Generate a new suggestion first."
      );
      return;
    }

    onAccept(suggestion);
    setSuggestion("");
    setSourceText("");
    setError("");
  };

  const handleDiscard = () => {
    setSuggestion("");
    setSourceText("");
    setError("");
  };

  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-body">
        <h5>✨ AI Writing Assistant</h5>

        <p className="text-muted">
          Improve your writing using AI.
        </p>

        <div className="d-flex gap-2 flex-wrap mb-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("grammar")}
          >
            Fix Grammar
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("improve")}
          >
            Improve Writing
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("professional")}
          >
            Professional Tone
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("summarize")}
          >
            Summarize
          </button>
        </div>

        {loading && (
          <div className="alert alert-info">
            AI is processing your text...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {suggestion && (
          <div className="border rounded p-3 bg-light">
            <h6>AI Suggestion</h6>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {suggestion}
            </p>

            {text !== sourceText && (
              <p className="text-warning">
                Your note changed after this suggestion was generated.
              </p>
            )}

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-success"
                disabled={text !== sourceText}
                onClick={handleAccept}
              >
                Accept Suggestion
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleDiscard}
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIWritingAssistant;