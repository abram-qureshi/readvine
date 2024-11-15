import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // This points to the custom axios instance you've set up
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send registration data to the backend with the correct URL
      const response = await axios.post('/users/register/', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      // If registration is successful, navigate to the home page
      if (response.status === 200 || response.status === 201) {
        console.info('Registration successful, navigating to home page');
        navigate('/'); // Redirecting to the home page
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage =
          typeof err.response.data === 'string'
            ? err.response.data
            : JSON.stringify(err.response.data);
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <div className="error-message">{error}</div>}
          {/* Form inputs for user registration */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
