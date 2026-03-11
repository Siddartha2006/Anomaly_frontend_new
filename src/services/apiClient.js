import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

export default apiClient;
