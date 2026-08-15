import api from './api';

export const structureService = {
    getUniversities: () => api.get('/universities').then((res) => res.data.data),

    getColleges: (universityId) =>
        api.get(`/universities/${universityId}/colleges`).then((res) => res.data.data),

    getAcademicYears: (collegeId) =>
        api.get(`/colleges/${collegeId}/academic-years`).then((res) => res.data.data),

    getSemesters: (academicYearId) =>
        api.get(`/academic-years/${academicYearId}/semesters`).then((res) => res.data.data),

    createAcademicYear: (payload) =>
        api.post('/academic-years', payload).then((res) => res.data.data),

    createSemester: (payload) =>
        api.post('/semesters', payload).then((res) => res.data.data),
};
