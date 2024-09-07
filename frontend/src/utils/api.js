import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = {
  post: async (url, data) => {
    const response = await axios.post(`${API_URL}${url}`, data);
    return response.data;
  },
  get: async (url) => {
    const response = await axios.get(`${API_URL}${url}`);
    return response.data;
  },
};

export default api;
