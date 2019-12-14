import axios from 'axios';
import { API_KEY, HASH, TS } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com',
});

api.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params.apikey = API_KEY;
  config.params.hash = HASH;
  config.params.ts = TS;
  return config;
});

export default api;
