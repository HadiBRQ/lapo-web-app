import axios from 'axios';

// Base URL of the API
const baseURL = 'https://api-stack-api.onrender.com/';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('authUser');
    if (user) {
      const token = JSON.parse(user).token;
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;