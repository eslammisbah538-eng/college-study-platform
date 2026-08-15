/**
 * subject.routes.js
 * GET  /api/subjects/most-viewed
 * GET  /api/subjects/:id
 * GET  /api/semesters/:semesterId/subjects
 * POST /api/subjects                (Admin only)
 * PUT  /api/subjects/:id            (Admin only)
 * DELETE /api/subjects/:id          (Admin only)
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/subject.controller');
const adminAuth = require('../middleware/adminAuth');
const validateRequest = require('../middleware/validateRequest');
const { createSubjectSchema, updateSubjectSchema } = require('../validators/subject.validator');

router.get('/subjects/most-viewed', controller.getMostViewed);
router.get('/subjects/:id', controller.getOne);
router.get('/semesters/:semesterId/subjects', controller.getBySemester);

router.post('/subjects', adminAuth, validateRequest(createSubjectSchema), controller.create);
router.put('/subjects/:id', adminAuth, validateRequest(updateSubjectSchema), controller.update);
router.delete('/subjects/:id', adminAuth, controller.remove);

module.exports = router;
