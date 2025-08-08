import axios from 'axios';

// Axios instance for consistent setup
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default axiosInstance;
