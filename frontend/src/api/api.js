import axios from "axios";

const api = axios.create({
  baseURL: "https://note-clener-1.onrender.com/api"   // ← assuming your backend runs on port 5000
});
// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;