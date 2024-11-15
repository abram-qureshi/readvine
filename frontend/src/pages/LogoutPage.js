// src/pages/LogoutPage.js
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // Import axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to reset state

const LogoutPage = () => {
  const navigate = useNavigate();

  // Destructure context to reset user information
  const { setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext);

  useEffect(() => {
    const logout = async () => {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        const access_token = localStorage.getItem('access_token');

        if (refresh_token && access_token) {
          // Send logout request with Authorization header
          await axios.post(
            'users/logout/',
            { refresh_token },
            {
              headers: {
                'Authorization': `Bearer ${access_token}`,
              },
            }
          );

          // Debug logout success
          console.info('Logout successful from backend.');
        } else {
          console.warn('No refresh or access token found, user might already be logged out.');
        }
      } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
      } finally {
        // Clear tokens and user info from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');

        // Reset AuthContext
        setIsLoggedIn(false);
        setUserId(null);
        setUsername(null);

        // Redirect to the login page
        console.info('Redirecting to login page...');
        navigate('/login', { replace: true });
      }
    };

    logout();
  }, [navigate, setIsLoggedIn, setUserId, setUsername]);

  return null; // No need to render anything
};

export default LogoutPage;
