import {
  createContext,
  useContext,
  useState
} from "react";

import api from "../../api/api.js";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  // LOGIN
  const login = async (data) => {

    const res = await api.post(
      "/auth/login",
      data
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setUser(res.data.user);

  };


  // REGISTER
  const register = async (data) => {

    const res = await api.post(
      "/auth/register",
      data
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setUser(res.data.user);

  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/login";

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


export const useAuth = () => {

  return useContext(AuthContext);

};
