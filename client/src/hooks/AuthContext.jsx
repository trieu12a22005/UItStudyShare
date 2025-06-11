import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLogin(true);
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (userData, accessToken) => {
    setIsLogin(true);
    setUser(userData);
    setToken(accessToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
  };

  const logout = async () => {
    try {
      await fetch('https://be-ltw.vercel.app/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLogin(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
