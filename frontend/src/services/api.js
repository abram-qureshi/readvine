// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Make sure this base URL matches your Django backend.
});

// Attach the token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Read token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
