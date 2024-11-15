import React, { useState } from 'react';
import axios from '../services/api';  // Assuming axios instance is properly configured
import '../styles/PasswordRecoveryPage.css';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State to show success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log to confirm the form is being submitted
    console.log('Attempting to send password recovery request for:', email);

    try {
      // Make POST request to the backend API to initiate password recovery
      const response = await axios.post('/users/recover-password/', { email });

      // Log the response to confirm that the request was successful
      console.log('Password recovery link sent successfully:', response);
      
      // Set a success message
      setMessage('Password recovery link has been sent to your email.');
    } catch (error) {
      // Enhanced error handling for better user feedback
      console.error('Error during password recovery:', error);

      if (error.response) {
        // Backend responded with a specific error
        setMessage('Error: ' + (error.response.data.error || 'Failed to send recovery link.'));
      } else if (error.request) {
        // Request was made but no response received
        setMessage('Error: No response from server. Please check your internet connection.');
      } else {
        // Error in setting up the request
        setMessage('Unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="password-recovery-page">
      <div className="password-recovery-form-container">
        <form className="password-recovery-form" onSubmit={handleSubmit}>
          <h2>Recover Password</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Send Recovery Link</button>
        </form>
        {message && <p className="message">{message}</p>}  {/* Display success or error message */}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
