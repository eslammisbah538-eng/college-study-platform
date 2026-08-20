/**
 * academicStructure.service.js
 */

const structureModel = require('../models/academicStructure.model');

const getAllUniversities = () => structureModel.findAllUniversities();

const createUniversity = (data) => structureModel.createUniversity(data);

const getCollegesByUniversity = (universityId) =>
    structureModel.findCollegesByUniversity(universityId);

const createCollege = (data) => structureModel.createCollege(data);

const getAcademicYearsByCollege = (collegeId) =>
    structureModel.findAcademicYearsByCollege(collegeId);

const getSemestersByAcademicYear = (academicYearId) =>
    structureModel.findSemestersByAcademicYear(academicYearId);

const createAcademicYear = (data) => structureModel.createAcademicYear(data);

const createSemester = (data) => structureModel.createSemester(data);

module.exports = {
    getAllUniversities,
     createUniversity,
    getCollegesByUniversity,
    createCollege,
    getAcademicYearsByCollege,
    getSemestersByAcademicYear,
    createAcademicYear,
    createSemester,
};
