import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const SetNewPasswordPage = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reset-password/${uid}/${token}/`, { new_password: newPassword });
      setMessage('Password successfully reset. You can now log in with your new password.');
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handlePasswordReset}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default SetNewPasswordPage;
