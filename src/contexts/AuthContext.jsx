import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ 초기값 false

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedIsAdmin = localStorage.getItem('is_admin') === 'true';

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin);
    }
  }, []); // ✅ 한 번만 실행

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
