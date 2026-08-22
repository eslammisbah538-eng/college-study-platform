/**
 * academicStructure.service.js
 */

const structureModel = require('../models/academicStructure.model');

const getAllUniversities = () => structureModel.findAllUniversities();

const createUniversity = (data) => structureModel.createUniversity(data);

const deleteUniversity = (id) => structureModel.deleteUniversity(id);

const getCollegesByUniversity = (universityId) =>
    structureModel.findCollegesByUniversity(universityId);

const createCollege = (data) => structureModel.createCollege(data);

const deleteCollege = (id) => structureModel.deleteCollege(id);

const getDepartmentsByCollege = (collegeId) => structureModel.findDepartmentsByCollege(collegeId);

const createDepartment = (data) => structureModel.createDepartment(data);

const deleteDepartment = (id) => structureModel.deleteDepartment(id);

const getAcademicYearsByDepartment = (departmentId) =>
    structureModel.findAcademicYearsByDepartment(departmentId);

const getSemestersByAcademicYear = (academicYearId) =>
    structureModel.findSemestersByAcademicYear(academicYearId);

const createAcademicYear = (data) => structureModel.createAcademicYear(data);

const deleteAcademicYear = (id) => structureModel.deleteAcademicYear(id);

const createSemester = (data) => structureModel.createSemester(data);

const deleteSemester = (id) => structureModel.deleteSemester(id);

module.exports = {
    getAllUniversities,
    createUniversity,
    deleteUniversity,
    getCollegesByUniversity,
    createCollege,
    deleteCollege,
    getDepartmentsByCollege,
    createDepartment,
    deleteDepartment,
    getAcademicYearsByDepartment,
    createAcademicYear,
    deleteAcademicYear,
    getSemestersByAcademicYear,
    createSemester,
    deleteSemester,
};
