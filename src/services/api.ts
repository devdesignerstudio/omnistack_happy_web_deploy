import axios from 'axios';

const api = axios.create({
  baseURL: 'https://happy-omnistack-deploy.herokuapp.com',
});

export default api;