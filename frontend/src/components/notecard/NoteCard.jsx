import {
  Link
}
  from "react-router-dom";


import {
  useNotes
}
  from "../context/NoteContext";


function NoteCard({ note }) {

  const {
    deleteNote
  } = useNotes();

  return (

    <div>
      <h2>
        {note.title}
      </h2>
      <p>
        {note.description}
      </p>
      <button

        onClick={
          () => deleteNote(note._id)
        }
      >
        Delete
      </button>



      <Link
        to={`/edit/${note._id}`}
      >

        Edit

      </Link>


    </div>


  )

}


export default NoteCard;