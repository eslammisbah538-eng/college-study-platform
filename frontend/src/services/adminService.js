import api from './api';

export const adminService = {
    login: (email, password) =>
        api.post('/admin/login', { email, password }).then((res) => res.data.data),

    getDashboard: () => api.get('/admin/dashboard').then((res) => res.data.data),

    getPendingFiles: () => api.get('/admin/files/pending').then((res) => res.data.data),

    reviewFile: (fileId, payload) =>
        api.patch(`/admin/files/${fileId}/review`, payload).then((res) => res.data),

    getNotifications: (unreadOnly = false) =>
        api
            .get('/admin/notifications', { params: { unread: unreadOnly } })
            .then((res) => res.data.data),
};
