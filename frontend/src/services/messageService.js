import apiClient from './apiClient';

export const messageService = {
    send: (data) => apiClient.post('/api/messages', data),
    getAllAdmin: () => apiClient.get('/api/admin/messages'),
    updateStatus: (id, data) => apiClient.put(`/api/admin/messages/${id}`, data),
    delete: (id) => apiClient.delete(`/api/admin/messages/${id}`)
};
