import { useState } from "react";
import NoteForm from "../form/NoteForm";
import NoteCard from "../notecard/NoteCard";
import { useNotes } from "../context/NoteContext";

function Home() {
  const { notes, loading, getNotes } = useNotes();
  const [search, setSearch] = useState("");

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    getNotes(search);
  };

  // CLEAR
  const handleClear = () => {
    setSearch("");
    getNotes("");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">
            <i className="bi bi-journal-bookmark"></i> My Notes
          </h1>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i> Search
              </button>
              {search && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClear}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </form>

          {/* CREATE NOTE */}
          <NoteForm />

          {/* NOTES */}
          {loading ? (
            <div className="text-center mt-4">
              <div className="spinner-border" role="status" />
            </div>
          ) : notes.length === 0 ? (
            <div className="alert alert-info">
              {search ? `No notes found for "${search}"` : "No notes available"}
            </div>
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