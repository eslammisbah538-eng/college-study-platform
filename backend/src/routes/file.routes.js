/**
 * file.routes.js
 * GET /api/files/recent
 * GET /api/files/:id
 * GET /api/subjects/:subjectId/files
 * PUT /api/files/:id                  (Admin only)
 * DELETE /api/files/:id                (Admin only)
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/file.controller');
const adminAuth = require('../middleware/adminAuth');
const validateRequest = require('../middleware/validateRequest');
const { updateFileSchema } = require('../validators/file.validator');

router.get('/files/recent', controller.getRecent);
router.get('/files/:id', controller.getOne);
router.get('/subjects/:subjectId/files', controller.getBySubject);

router.put('/files/:id', adminAuth, validateRequest(updateFileSchema), controller.update);
router.delete('/files/:id', adminAuth, controller.remove);

module.exports = router;
