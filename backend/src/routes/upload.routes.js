/**
 * upload.routes.js
 * POST /api/upload
 * (بدون تسجيل دخول - أي طالب يقدر يرفع، لكن الملف بيفضل pending)
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/upload.controller');
const upload = require('../middleware/uploadMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { uploadFileSchema } = require('../validators/file.validator');
const { uploadLimiter } = require('../middleware/rateLimiter');

// upload.single('file') بيقرأ الملف من الفورم لو موجود (اختياري - ممكن يبقى رابط يوتيوب بس)
router.post(
    '/upload',
    uploadLimiter,
    upload.single('file'),
    validateRequest(uploadFileSchema),
    controller.submitFile
);

module.exports = router;
