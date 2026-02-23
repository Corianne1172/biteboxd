import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isAuthed = !!token;

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const accessToken = res.data.access_token;
    localStorage.setItem("token", accessToken);
    setToken(accessToken);

    return res.data;
  };
  ;

  const register = async (username, email, password) => {
    await api.post("/auth/register", { username, email, password });
    await login(email, password); // auto-login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = useMemo(
    () => ({ isAuthed, token, login, register, logout }),
    [isAuthed, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
