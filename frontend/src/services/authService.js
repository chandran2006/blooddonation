import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.clear();
    window.location.href = '/login';
  },

  getToken: () => localStorage.getItem('token'),
  
  getRole: () => localStorage.getItem('role'),
  
  getEmail: () => localStorage.getItem('email'),
  
  isAuthenticated: () => !!localStorage.getItem('token'),
};
