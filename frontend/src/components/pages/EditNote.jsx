import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function EditNoteForm({ note, updateNote }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: note.title || "",
    description: note.description || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateNote(note._id, form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Could not update the note. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container py-4">
      <h2>Edit Note</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="note-title" className="form-label">
          Title
        </label>

        <input
          id="note-title"
          name="title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
          disabled={saving}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="note-description" className="form-label">
          Description
        </label>

        <textarea
          id="note-description"
          name="description"
          className="form-control"
          rows={6}
          value={form.description}
          onChange={handleChange}
          disabled={saving}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, loading, updateNote } = useNotes();

  if (loading) {
    return <div className="container py-4">Loading note...</div>;
  }

  const note = notes.find((item) => item._id === id);

  if (!note) {
    return (
      <div className="container py-4">
        <p role="alert">The note could not be found or loaded.</p>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Back to notes
        </button>
      </div>
    );
  }

  return (
    <EditNoteForm
      key={note._id}
      note={note}
      updateNote={updateNote}
    />
  );
}

export default EditNote;