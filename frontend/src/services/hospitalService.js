import api from './api';

export const hospitalService = {
  createRequest: async (data) => {
    const response = await api.post('/hospital/create-request', data);
    return response.data;
  },

  getAllRequests: async () => {
    const response = await api.get('/hospital/all-requests');
    return response.data;
  },
};
