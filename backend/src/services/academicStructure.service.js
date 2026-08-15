/**
 * academicStructure.service.js
 */

const structureModel = require('../models/academicStructure.model');

const getAllUniversities = () => structureModel.findAllUniversities();

const getCollegesByUniversity = (universityId) =>
    structureModel.findCollegesByUniversity(universityId);

const getAcademicYearsByCollege = (collegeId) =>
    structureModel.findAcademicYearsByCollege(collegeId);

const getSemestersByAcademicYear = (academicYearId) =>
    structureModel.findSemestersByAcademicYear(academicYearId);

const createAcademicYear = (data) => structureModel.createAcademicYear(data);

const createSemester = (data) => structureModel.createSemester(data);

module.exports = {
    getAllUniversities,
    getCollegesByUniversity,
    getAcademicYearsByCollege,
    getSemestersByAcademicYear,
    createAcademicYear,
    createSemester,
};
