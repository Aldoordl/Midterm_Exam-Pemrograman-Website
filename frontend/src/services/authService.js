import apiClient from './apiClient';

export const authService = {
    login: (credentials) => apiClient.post('/api/login', credentials),
    logout: () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    },
    getToken: () => localStorage.getItem('admin_token'),
    isAuthenticated: () => !!localStorage.getItem('admin_token')
};
