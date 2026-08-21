/**
 * academicStructure.routes.js
 * GET /api/universities
 * GET /api/universities/:universityId/colleges
 * GET /api/colleges/:collegeId/academic-years
 * GET /api/academic-years/:academicYearId/semesters
 * POST /api/academic-years        (Admin only)
 * POST /api/semesters             (Admin only)
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/academicStructure.controller');
const adminAuth = require('../middleware/adminAuth');

router.get('/universities', controller.getUniversities);
router.post('/universities', adminAuth, controller.createUniversity);
router.get('/universities/:universityId/colleges', controller.getColleges);
router.post('/colleges', adminAuth, controller.createCollege);
router.get('/colleges/:collegeId/departments', controller.getDepartments);
router.post('/departments', adminAuth, controller.createDepartment);
router.get('/departments/:departmentId/academic-years', controller.getAcademicYears);
router.get('/academic-years/:academicYearId/semesters', controller.getSemesters);

router.post('/academic-years', adminAuth, controller.createAcademicYear);
router.post('/semesters', adminAuth, controller.createSemester);


module.exports = router;
