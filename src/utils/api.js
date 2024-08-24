import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Fallback to localhost if env var is not set
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set a timeout limit (10 seconds in this case)
});

// You can also add request interceptors if needed
api.interceptors.request.use(
  config => {
    // Modify the request configuration before sending it out, for example:
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  error => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Add response interceptors if you need to handle responses in a specific way
api.interceptors.response.use(
  response => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      // Handle errors based on status codes
      if (error.response.status === 401) {
        // Redirect to login or refresh token, etc.
      }
    }
    return Promise.reject(error);
  }
);

export default api;

