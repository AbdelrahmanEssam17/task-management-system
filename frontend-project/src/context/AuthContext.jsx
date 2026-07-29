import React, { createContext, useContext, useState, useEffect } from 'react';
import { logoutUser } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (responseData) => {
    const data = responseData?.data || responseData;
    const accessToken = data?.accessToken;
    const userData = data?.user || null;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
    }
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Silently handle errors
    }
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
