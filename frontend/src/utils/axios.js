// src/utils/axios.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Base URL for backend APIs
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token in requests automatically
api.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally: Refresh token if request fails with a 401 Unauthorized error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refresh_token,
          });
          // Save the new access token
          localStorage.setItem('access_token', response.data.access);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        // Handle refresh error (e.g., log the user out)
        console.error('Refresh token expired or invalid');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
