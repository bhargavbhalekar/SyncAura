// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5002/api', // Your backend base URL
});

export default API;
