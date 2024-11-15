import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { uid, token } = useParams(); // Get uid and token from the URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await api.post(`/users/reset-password/${uid}/${token}/`, {
        new_password: newPassword,
      });

      if (response.status === 200) {
        setSuccess(true);
        alert('Password reset successfully! Redirecting to login page...');
        navigate('/login');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-container">
        <h2>Reset Your Password</h2>
        {success ? (
          <p>Your password has been reset successfully. You will be redirected to the login page shortly.</p>
        ) : (
          <form onSubmit={handlePasswordChange}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
