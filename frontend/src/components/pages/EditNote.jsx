import {
  useParams,
  useNavigate
}
  from "react-router-dom";


import { useNotes } from "../context/NoteContext";

import { useState } from "react";

function EditNote() {
  const {
    id
  } = useParams();

  const { notes, updateNote } = useNotes();

  const navigate = useNavigate();

  const note =
    notes.find(
      n => n._id === id
    );

  const [form, setForm] = useState({
    title: note?.title || "",

    description:
      note?.description || ""

  });
  const submit = async (e) => {
    e.preventDefault();
    await updateNote(
      id,
      form
    );
    navigate("/");

  }
  return (

    <form onSubmit={submit}>
      <input

        value={form.title}

        onChange={
          e =>
            setForm({
              ...form,
              title: e.target.value
            })
        }
      />
      <textarea

        value={form.description}
        onChange={
          e =>
            setForm({
              ...form,
              description: e.target.value
            })
        }
      />
      <button>
        Update
      </button>

    </form>

  )

}

export default EditNote;