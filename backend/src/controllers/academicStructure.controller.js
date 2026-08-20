/**
 * academicStructure.controller.js
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const structureService = require('../services/academicStructure.service');

const getUniversities = asyncHandler(async (req, res) => {
    const universities = await structureService.getAllUniversities();
    new ApiResponse(200, universities).send(res);
});
const createUniversity = asyncHandler(async (req, res) => {
    const university = await structureService.createUniversity(req.body);
    new ApiResponse(201, university, 'تم إضافة الجامعة بنجاح').send(res);
});

const getColleges = asyncHandler(async (req, res) => {
    const colleges = await structureService.getCollegesByUniversity(req.params.universityId);
    new ApiResponse(200, colleges).send(res);
});

const createCollege = asyncHandler(async (req, res) => {
    const college = await structureService.createCollege(req.body);
    new ApiResponse(201, college, 'تم إضافة الكلية بنجاح').send(res);
});

const getAcademicYears = asyncHandler(async (req, res) => {
    const years = await structureService.getAcademicYearsByCollege(req.params.collegeId);
    new ApiResponse(200, years).send(res);
});

const getSemesters = asyncHandler(async (req, res) => {
    const semesters = await structureService.getSemestersByAcademicYear(req.params.academicYearId);
    new ApiResponse(200, semesters).send(res);
});

// ---------- Admin-only actions ----------
const createAcademicYear = asyncHandler(async (req, res) => {
    const year = await structureService.createAcademicYear(req.body);
    new ApiResponse(201, year, 'تم إضافة السنة الدراسية بنجاح').send(res);
});

const createSemester = asyncHandler(async (req, res) => {
    const semester = await structureService.createSemester(req.body);
    new ApiResponse(201, semester, 'تم إضافة الترم بنجاح').send(res);
});

module.exports = {
    getUniversities,
    createUniversity,
    getColleges,
    createCollege,
    getAcademicYears,
    getSemesters,
    createAcademicYear,
    createSemester,
};
