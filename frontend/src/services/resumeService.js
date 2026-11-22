import apiClient from './apiClient';

export const resumeService = {
    getPublic: () => apiClient.get('/api/resume'),
    create: (data) => apiClient.post('/api/admin/resume', data),
    update: (id, data) => apiClient.put(`/api/admin/resume/${id}`, data),
    delete: (id) => apiClient.delete(`/api/admin/resume/${id}`)
};
