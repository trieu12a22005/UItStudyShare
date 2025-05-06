import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null); // <-- thêm user

  const login = (userData) => {
    setIsLogin(true);
    setUser(userData); // lưu user
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3055/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLogin(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
