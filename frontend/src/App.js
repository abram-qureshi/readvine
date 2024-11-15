// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import BooksPage from './pages/BooksPage';
import LogoutPage from './pages/LogoutPage';
import BookSearch from './components/BookSearch';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route
          path="/add-book"
          element={isAuthenticated ? <AddBookPage /> : <Navigate to="/login" />}
        />
        <Route path="/recover-password" element={<PasswordRecoveryPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/searchBooks" element={<BookSearch />} /> {/* Updated to match your preference */}
        <Route path="/reset-password/:uid/:token/" element={<ResetPasswordPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
