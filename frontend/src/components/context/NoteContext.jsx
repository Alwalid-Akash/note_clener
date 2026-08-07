import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/api.js";
import { useAuth } from "./AuthContext.jsx";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // READ (Get all notes)
  const getNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE (Add a note)
  const createNote = async (data) => {
    try {
      const res = await api.post("/notes", data);
      setNotes([...notes, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE (Edit a note)
  const updateNote = async (id, data) => {
    try {
      const res = await api.put(`/notes/${id}`, data);
      setNotes(notes.map(n => n._id === id ? res.data : n));
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE (Remove a note)
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        getNotes,      // Changed from fetchNotes
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);