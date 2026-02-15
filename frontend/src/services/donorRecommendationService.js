import api from './api';

export const donorRecommendationService = {
  getRecommendations: async (requestId) => {
    const response = await api.get(`/donor/recommend/${requestId}`);
    return response.data;
  },

  contactDonor: async (donorId, requestId, message) => {
    const response = await api.post('/donor/contact', {
      donorId,
      requestId,
      message
    });
    return response.data;
  },
};
