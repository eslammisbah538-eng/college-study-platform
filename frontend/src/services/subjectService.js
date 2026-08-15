import api from './api';

export const subjectService = {
    getBySemester: (semesterId) =>
        api.get(`/semesters/${semesterId}/subjects`).then((res) => res.data.data),

    getOne: (id) => api.get(`/subjects/${id}`).then((res) => res.data.data),

    getMostViewed: (limit = 6) =>
        api.get('/subjects/most-viewed', { params: { limit } }).then((res) => res.data.data),

    create: (payload) => api.post('/subjects', payload).then((res) => res.data.data),

    update: (id, payload) => api.put(`/subjects/${id}`, payload).then((res) => res.data.data),

    remove: (id) => api.delete(`/subjects/${id}`).then((res) => res.data),
};
