import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();//createContext es una funcion proporcionada por react

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intentar recuperar desde localStorage
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('authUser', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {

    if (email === 'admin@gmail.com' && password === '1234') {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
