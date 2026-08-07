import { Link } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function NoteCard({ note }) {
  const { deleteNote } = useNotes();

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <i className="bi bi-sticky"></i> {note.title}
        </h5>

        <p className="card-text text-muted">{note.description}</p>

        <div className="d-flex gap-2">
          <Link className="btn btn-warning" to={`/edit/${note._id}`}>
            <i className="bi bi-pencil"></i> Edit
          </Link>

          <button
            className="btn btn-danger"
            onClick={() => deleteNote(note._id)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;