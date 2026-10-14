
import { useState } from "react";
import { useNotes } from "../context/NoteContext";
import AIWritingAssistant from "../AIWritingAssistant.jsx";

function NoteForm() {
  const { createNote } = useNotes();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setLoading(true);

      await createNote({
        title: form.title.trim(),
        description: form.description.trim(),
      });

      // Clear form after successful save
      setForm({
        title: "",
        description: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create note."
      );
    } finally {
      setLoading(false);
    }
  };

  // Accept AI-generated text
  const handleAcceptAI = (improvedText) => {
    setForm((prev) => ({
      ...prev,
      description: improvedText,
    }));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5 className="mb-3">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Note
        </h5>

        <form onSubmit={submit}>
          {/* Note Title */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Note title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
          />

          {/* Note Description */}
          <textarea
            className="form-control mb-3"
            rows={5}
            placeholder="Write your note here..."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            required
          />

          {/* AI Writing Assistant */}
          <AIWritingAssistant
            text={form.description}
            onAccept={handleAcceptAI}
          />

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
