import axios from "axios";


const api = axios.create({

  baseURL: "https://note-clener1.onrender.com"

});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token");
  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }
  return config;


});


export default api;