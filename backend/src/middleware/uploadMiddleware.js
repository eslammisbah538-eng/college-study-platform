/**
 * uploadMiddleware.js
 * إعداد Multer لاستقبال الملف كـ Buffer في الذاكرة
 * (بنبعته بعد كده لـ Supabase Storage، مش بنخزنه على السيرفر)
 */

const multer = require('multer');
const ApiError = require('../utils/ApiError');

const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'video/mp4',
    'image/png',
    'image/jpeg',
    'image/webp',
];

const MAX_FILE_SIZE_MB = 50;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(ApiError.badRequest(`نوع الملف غير مدعوم: ${file.mimetype}`));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
});

module.exports = upload;
