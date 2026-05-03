import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (username, email, password, firstName, lastName) =>
    api.post('/auth/register', { username, email, password, firstName, lastName }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Users API
export const usersAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  getCurrentUser: () => api.get('/users'),
  updateProfile: (data) => api.put('/users', data),
};

// Items API
export const itemsAPI = {
  getNearby: (latitude, longitude, maxDistance) =>
    api.get('/items/nearby', { params: { latitude, longitude, maxDistance } }),
  getAll: (filters) => api.get('/items', { params: filters }),
  getById: (itemId) => api.get(`/items/${itemId}`),
  create: (data) => api.post('/items', data),
  update: (itemId, data) => api.put(`/items/${itemId}`, data),
  delete: (itemId) => api.delete(`/items/${itemId}`),
};

// Trades API
export const tradesAPI = {
  propose: (proposerItemId, receiverId, receiverItemId, message) =>
    api.post('/trades', { proposerItemId, receiverId, receiverItemId, message }),
  getAll: (status) => api.get('/trades', { params: { status } }),
  getById: (tradeId) => api.get(`/trades/${tradeId}`),
  accept: (tradeId) => api.put(`/trades/${tradeId}/accept`),
  complete: (tradeId, rating, review) =>
    api.put(`/trades/${tradeId}/complete`, { rating, review }),
  decline: (tradeId) => api.put(`/trades/${tradeId}/decline`),
};

export default api;
