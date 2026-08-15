import api from './api';

export const fileService = {
    getBySubject: (subjectId) =>
        api.get(`/subjects/${subjectId}/files`).then((res) => res.data.data),

    getOne: (id) => api.get(`/files/${id}`).then((res) => res.data.data),

    getRecent: (limit = 10) =>
        api.get('/files/recent', { params: { limit } }).then((res) => res.data.data),

    search: (query) => api.get('/search', { params: { q: query } }).then((res) => res.data.data),

    update: (id, payload) => api.put(`/files/${id}`, payload).then((res) => res.data.data),

    remove: (id) => api.delete(`/files/${id}`).then((res) => res.data),

    getCategories: () => api.get('/categories').then((res) => res.data.data),
};
