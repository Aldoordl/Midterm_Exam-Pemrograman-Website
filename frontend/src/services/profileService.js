import apiClient from './apiClient';

export const profileService = {
    getPublic: () => apiClient.get('/api/profile'),
    updateAdmin: (data) => apiClient.post('/api/admin/profile', data)
};
