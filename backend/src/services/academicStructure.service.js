/**
 * academicStructure.service.js
 */

const structureModel = require('../models/academicStructure.model');

const getAllUniversities = () => structureModel.findAllUniversities();

const createUniversity = (data) => structureModel.createUniversity(data);

const getCollegesByUniversity = (universityId) =>
    structureModel.findCollegesByUniversity(universityId);

const createCollege = (data) => structureModel.createCollege(data);

const getDepartmentsByCollege = (collegeId) => structureModel.findDepartmentsByCollege(collegeId);
const createDepartment = (data) => structureModel.createDepartment(data);

const getAcademicYearsByDepartment = (departmentId) =>
    structureModel.findAcademicYearsByDepartment(departmentId);

const getSemestersByAcademicYear = (academicYearId) =>
    structureModel.findSemestersByAcademicYear(academicYearId);

const createAcademicYear = (data) => structureModel.createAcademicYear(data);

const createSemester = (data) => structureModel.createSemester(data);

module.exports = {
    getAllUniversities,
    createUniversity,
    getCollegesByUniversity,
    createCollege,
    getDepartmentsByCollege,
    createDepartment,
    getAcademicYearsByDepartment,
    createAcademicYear,
    getSemestersByAcademicYear,
    createSemester,
};
