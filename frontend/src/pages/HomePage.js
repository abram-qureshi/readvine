import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is correctly set up and provides authentication status
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Extract the isLoggedIn value from the AuthContext

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <h1>Welcome to ReadVine!</h1>
        <p>Plant the seed of reading, nurture a community.</p>

        {/* If user is logged in, show the "View Profile" button */}
        {isLoggedIn ? (
          <button
            className="profile-button"
            onClick={() => navigate('/profile')}
          >
            View Profile
          </button>
        ) : (
          // If user is not logged in, show the "Join Now" button
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
