// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if user is logged in when the app starts
    const accessToken = localStorage.getItem('access_token');
    const savedUserId = localStorage.getItem('user_id');
    const savedUsername = localStorage.getItem('username');

    if (accessToken && savedUserId && savedUsername) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      setUsername(savedUsername);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setUsername(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
