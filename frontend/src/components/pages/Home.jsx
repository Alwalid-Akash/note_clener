import NoteForm from "../form/NoteForm";
import NoteCard from "../notecard/NoteCard";

import { useNotes } from "../context/NoteContext";


function Home() {
  const { notes, loading } = useNotes();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">
            <i className="bi bi-journal-bookmark"></i> My Notes
          </h1>

          <NoteForm />

          {loading ? (
            <div className="text-center">
              <div className="spinner-border"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="alert alert-info">No notes available</div>
          ) : (
            notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;