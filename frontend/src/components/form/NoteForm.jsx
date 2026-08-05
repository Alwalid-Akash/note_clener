import { useState } from "react";

import { useNotes } from "../context/NoteContext";


function NoteForm() {

  const { createNote } = useNotes();

  const [form, setForm] = useState({

    title: "",
    description: ""

  });

  const handleSubmit = async (e) => {


    e.preventDefault();


    await createNote(form);

    setForm({

      title: "",
      description: ""

    });

  };


  return (

    <form onSubmit={handleSubmit}>

      <input

        placeholder="Title"

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

        placeholder="Description"

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
        Add Note
      </button>

    </form>

  )
}


export default NoteForm;