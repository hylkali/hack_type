import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('is_admin') === 'true'
  );

  const login = (newToken, name, adminFlag) => {
    setToken(newToken);
    setUsername(name);
    setIsAdmin(adminFlag);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', name);
    localStorage.setItem('is_admin', adminFlag);
  };

   const logout = () => {
    setToken(null);
    setUsername(null);
    setIsAdmin(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, username, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};