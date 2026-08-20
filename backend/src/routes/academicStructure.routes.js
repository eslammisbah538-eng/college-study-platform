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
router.get('/universities/:universityId/colleges', controller.getColleges);
router.get('/colleges/:collegeId/academic-years', controller.getAcademicYears);
router.get('/academic-years/:academicYearId/semesters', controller.getSemesters);

router.post('/academic-years', adminAuth, controller.createAcademicYear);
router.post('/semesters', adminAuth, controller.createSemester);
router.post('/universities', adminAuth, controller.createUniversity);
router.post('/colleges', adminAuth, controller.createCollege);

module.exports = router;
