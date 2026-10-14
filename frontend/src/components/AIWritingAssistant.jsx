import { useState } from "react";
import api from "../api/api.js";

function AIWritingAssistant({ text, onAccept }) {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAI = async (action) => {
    if (!text?.trim()) {
      setError("Please write something first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuggestion("");

    try {
      const res = await api.post("/ai/improve", {
        text,
        action,
      });

      setSuggestion(res.data.suggestion);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const acceptSuggestion = () => {
    onAccept(suggestion);
    setSuggestion("");
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5>✨ AI Writing Assistant</h5>

        <div className="d-flex gap-2 flex-wrap my-3">
          <button
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("grammar")}
          >
            Fix Grammar
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("improve")}
          >
            Improve Writing
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("professional")}
          >
            Professional Tone
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={loading}
            onClick={() => handleAI("summarize")}
          >
            Summarize
          </button>
        </div>

        {loading && <p>AI is working...</p>}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {suggestion && (
          <div className="border rounded p-3">
            <h6>AI Suggestion</h6>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {suggestion}
            </p>

            <button
              className="btn btn-success me-2"
              onClick={acceptSuggestion}
            >
              Accept
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setSuggestion("")}
            >
              Discard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIWritingAssistant;