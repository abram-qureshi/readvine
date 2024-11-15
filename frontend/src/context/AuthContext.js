// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  // Synchronize state with local storage values
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUserId = localStorage.getItem('user_id');
    const savedUsername = localStorage.getItem('username');

    if (token && savedUserId && savedUsername) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      setUsername(savedUsername);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setUsername(null);
    }
  }, []);

  // New Effect: Watch for changes to localStorage and update state accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token');
      const savedUserId = localStorage.getItem('user_id');
      const savedUsername = localStorage.getItem('username');

      if (token && savedUserId && savedUsername) {
        setIsLoggedIn(true);
        setUserId(savedUserId);
        setUsername(savedUsername);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setUsername(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
