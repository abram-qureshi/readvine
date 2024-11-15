// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios'; // Custom axios instance
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Destructure context values
  const { setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the login request to the backend
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        email,
        password,
      });

      console.log('Login response data:', response.data);

      if (response.data.access && response.data.refresh) {
        // Store tokens and user info in localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_id', response.data.user_id); // Store user ID
        localStorage.setItem('username', response.data.username); // Store username

        // Update AuthContext state to reflect successful login
        setIsLoggedIn(true);
        setUserId(response.data.user_id);
        setUsername(response.data.username);

        // Set a session flag to trigger a refresh on the home page
        sessionStorage.setItem('hasRefreshed', 'false');

        console.info('Login successful, redirecting to home page...');
        navigate('/', { replace: true }); // Navigate to home page after login
      } else {
        console.error('Access or refresh token not found in response.');
      }
    } catch (err) {
      if (err.response) {
        console.error('Error response from server:', err.response.data);
      } else if (err.request) {
        console.error('No response received from server:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
          {/* Added Forgot Password Link */}
          <div className="forgot-password-link">
            <Link to="/recover-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
