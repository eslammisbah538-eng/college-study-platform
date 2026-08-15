/**
 * upload.controller.js
 * خاص بالطلاب: رفع ملف جديد بدون الحاجة لإنشاء حساب
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const uploadService = require('../services/upload.service');

const submitFile = asyncHandler(async (req, res) => {
    // req.file جاي من multer (uploadMiddleware) لو الطالب رفع ملف فعلي
    const savedFile = await uploadService.submitFile(req.body, req.file);

    new ApiResponse(
        201,
        savedFile,
        'تم استلام ملفك بنجاح، وسيظهر في الموقع بعد مراجعة الأدمن'
    ).send(res);
});

module.exports = { submitFile };
