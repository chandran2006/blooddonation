import api from './api';

export const patientService = {
  createRequest: async (data) => {
    const response = await api.post('/patient/request', data);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get('/patient/my-requests');
    return response.data;
  },
};
