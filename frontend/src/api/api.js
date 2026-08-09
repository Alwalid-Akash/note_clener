import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api"   // ← assuming your backend runs on port 5000
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