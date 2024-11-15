// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage and redirect to login page
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <header className="navbar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '10px 20px' }}>
      <div className="container">
        <Link className="navbar-brand" style={{ color: 'white', textDecoration: 'none' }} to="/">ReadVine</Link>
        <div className="navbar-right">
          {!isAuthenticated ? (
            <Link className="nav-link" style={{ color: 'white', textDecoration: 'none' }} to="/login">Sign In</Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
