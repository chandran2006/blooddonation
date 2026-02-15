import api from './api';

export const adminService = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/delete/${id}`);
    return response.data;
  },

  getAllRequests: async () => {
    const response = await api.get('/admin/requests');
    return response.data;
  },
};
