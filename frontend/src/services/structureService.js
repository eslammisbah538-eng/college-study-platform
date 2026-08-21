import api from './api';
export const structureService = {
    getUniversities: () => api.get('/universities').then((res) => res.data.data),
    getColleges: (universityId) =>
        api.get(`/universities/${universityId}/colleges`).then((res) => res.data.data),
      getAcademicYears: (departmentId) =>
        api.get(`/departments/${departmentId}/academic-years`).then((res) => res.data.data),
    getSemesters: (academicYearId) =>
        api.get(`/academic-years/${academicYearId}/semesters`).then((res) => res.data.data),
    createAcademicYear: (payload) =>
        api.post('/academic-years', payload).then((res) => res.data.data),
    createSemester: (payload) =>
        api.post('/semesters', payload).then((res) => res.data.data),
    createUniversity: (payload) =>
        api.post('/universities', payload).then((res) => res.data.data),
    createCollege: (payload) =>
        api.post('/colleges', payload).then((res) => res.data.data),
        getDepartments: (collegeId) =>
        api.get(`/colleges/${collegeId}/departments`).then((res) => res.data.data),
    createDepartment: (payload) =>
        api.post('/departments', payload).then((res) => res.data.data),
};
