// src/pages/HomePage.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is correctly set up
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [showProfileButton, setShowProfileButton] = useState(false);

  useEffect(() => {
    // Check if the page needs a hard refresh
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    if (hasRefreshed === 'false') {
      // Set the flag to true to indicate that we have refreshed already
      sessionStorage.setItem('hasRefreshed', 'true');
      // Perform a hard refresh
      window.location.reload();
    } else {
      // Otherwise, determine button visibility based on token and login state
      const token = localStorage.getItem('access_token');
      setShowProfileButton(!!token || isLoggedIn);
    }
  }, [isLoggedIn]);

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <h1>Welcome to ReadVine!</h1>
        <p>Plant the seed of reading, nurture a community.</p>

        {showProfileButton ? (
          <button
            className="profile-button"
            onClick={() => navigate('/profile')}
          >
            View Profile
          </button>
        ) : (
          <button
            className="join-button"
            onClick={() => navigate('/register')}
          >
            Join Now
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
