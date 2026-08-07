import { createContext, useContext, useState } from "react";
import api from "../../api/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );





  const register = async (data) => {

    try {

      console.log("Register data:", data);


      const res = await api.post(
        "/auth/register",
        data
      );


      console.log("Register response:", res.data);


      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      setUser(res.data.user);


      return res.data;


    } catch (error) {


      console.log(
        "Register failed:",
        error.response?.data || error.message
      );


      throw error;


    }

  };



  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);