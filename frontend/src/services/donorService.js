import api from './api';

export const donorService = {
  getProfile: async () => {
    const response = await api.get('/donor/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/donor/update', data);
    return response.data;
  },

  getRequests: async () => {
    const response = await api.get('/donor/requests');
    return response.data;
  },

  acceptRequest: async (requestId) => {
    const response = await api.put(`/donor/accept-request/${requestId}`);
    return response.data;
  },
};
