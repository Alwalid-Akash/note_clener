import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/api.js";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (data) => {
    const res = await api.post("/notes", data);
    setNotes([...notes, res.data]);
  };

  const updateNote = async (id, data) => {
    const res = await api.put(`/notes/${id}`, data);
    setNotes(notes.map(n => n._id === id ? res.data : n));
  };

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes(notes.filter(n => n._id !== id));
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <NoteContext.Provider value={{ notes, loading, createNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);