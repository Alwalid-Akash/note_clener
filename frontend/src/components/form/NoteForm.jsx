import { useState } from "react";
import { useNotes } from "../context/NoteContext";

function NoteForm() {
  const { createNote } = useNotes();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    createNote(form);
    setForm({
      title: "",
      description: "",
    });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5>
          <i className="bi bi-plus-circle"></i>
          Add New Note
        </h5>
        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Note title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <button className="btn btn-primary w-100">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;