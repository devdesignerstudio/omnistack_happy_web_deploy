import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happybrazil.netlify.app',
});

export default api;