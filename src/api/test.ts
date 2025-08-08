import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const checkBackend = async () => {
  const response = await axios.get(`${BASE_URL}/ping`);
  return response.data;
};
