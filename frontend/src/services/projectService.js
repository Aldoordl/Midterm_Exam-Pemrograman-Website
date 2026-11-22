import apiClient from './apiClient';

export const projectService = {
    getPublic: () => apiClient.get('/api/projects'),
    getPublicDetail: (slug) => apiClient.get(`/api/projects/${slug}`),
    getAllAdmin: () => apiClient.get('/api/admin/projects'),
    create: (data) => apiClient.post('/api/admin/projects', data),
    update: (id, data) => apiClient.put(`/api/admin/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/api/admin/projects/${id}`)
};
