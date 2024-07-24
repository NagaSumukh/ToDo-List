import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthData({ token });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
