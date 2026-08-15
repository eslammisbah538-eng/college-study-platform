/**
 * admin.routes.js
 * POST /api/admin/login                          (عام)
 * GET  /api/admin/dashboard                       (Admin only)
 * GET  /api/admin/files/pending                    (Admin only)
 * PATCH /api/admin/files/:fileId/review             (Admin only)
 * GET  /api/admin/notifications                     (Admin only)
 * PATCH /api/admin/notifications/:notificationId/read (Admin only)
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');
const validateRequest = require('../middleware/validateRequest');
const { loginSchema } = require('../validators/admin.validator');
const { reviewFileSchema } = require('../validators/file.validator');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/admin/login', loginLimiter, validateRequest(loginSchema), controller.login);

router.get('/admin/dashboard', adminAuth, controller.getDashboard);
router.get('/admin/files/pending', adminAuth, controller.getPendingFiles);
router.patch(
    '/admin/files/:fileId/review',
    adminAuth,
    validateRequest(reviewFileSchema),
    controller.reviewFile
);

router.get('/admin/notifications', adminAuth, controller.getMyNotifications);
router.patch('/admin/notifications/:notificationId/read', adminAuth, controller.markNotificationRead);

module.exports = router;
