import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import api from "../../api/api.js";
import { useAuth } from "./AuthContext.jsx";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // GET NOTES + SEARCH
  const getNotes = async (search = "") => {
    try {
      setLoading(true);
      const res = await api.get("/notes", {
        params: {
          search: search.trim()
        }
      });
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const createNote = async (data) => {
    try {
      const res = await api.post("/notes", data);
      setNotes((prevNotes) => [res.data, ...prevNotes]);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE NOTE
  const updateNote = async (id, data) => {
    try {
      const res = await api.put(`/notes/${id}`, data);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? res.data : note
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // GET NOTES AFTER LOGIN
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
        getNotes,
        createNote,
        updateNote,
        deleteNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);