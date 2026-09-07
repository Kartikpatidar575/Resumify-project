import React, { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticate] = useState(
    !!localStorage.getItem("token"),
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticate(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticate(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
