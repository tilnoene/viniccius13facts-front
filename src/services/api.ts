import axios from 'axios';

const manualIsDev = false;

const api = axios.create({
  baseURL: manualIsDev ? 'http://localhost:4000/' : 'https://viniccius13facts-back-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
