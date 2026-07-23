import { createContext, useContext, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => localStorage.getItem("adminEmail"));
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  async function login(loginEmail, password) {
    const { data } = await api.post("/auth/login", { email: loginEmail, password });
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminEmail", data.email);
    setToken(data.token);
    setEmail(data.email);
  }

  function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setToken(null);
    setEmail(null);
  }

  const value = { email, token, isAuthenticated: !!token, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
