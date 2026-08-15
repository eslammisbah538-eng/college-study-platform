/**
 * upload.service.js
 * منطق العمل الخاص برفع الملفات:
 * 1. رفع الملف الفعلي لـ Supabase Storage (لو موجود)
 * 2. حفظ بيانات الملف في قاعدة البيانات بحالة "pending"
 * 3. إنشاء إشعار للأدمن
 */

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileModel = require('../models/file.model');
const categoryModel = require('../models/category.model');
const notificationService = require('./notification.service');
const storage = require('../config/storage');
const ApiError = require('../utils/ApiError');

/**
 * @param {object} fileData - البيانات النصية (title, subjectId, categoryId...)
 * @param {object|null} uploadedFile - الملف الفعلي من multer (req.file) لو موجود
 */
const submitFile = async (fileData, uploadedFile) => {
    const category = await categoryModel.findById(fileData.categoryId);
    if (!category) {
        throw ApiError.badRequest('التصنيف المحدد غير موجود');
    }

    // لازم يكون معانا إما ملف مرفوع فعليًا أو رابط خارجي (يوتيوب مثلاً)، مش فاضيين الاتنين
    if (!uploadedFile && !fileData.externalUrl) {
        throw ApiError.badRequest('يجب رفع ملف أو إدخال رابط خارجي');
    }

    let fileUrl = null;
    let fileSizeKb = null;

    if (uploadedFile) {
        const uniqueName = `${uuidv4()}${path.extname(uploadedFile.originalname)}`;
        fileUrl = await storage.uploadFile(uploadedFile.buffer, uniqueName, uploadedFile.mimetype);
        fileSizeKb = Math.round(uploadedFile.size / 1024);
    }

    const savedFile = await fileModel.create({
        subjectId: fileData.subjectId,
        categoryId: fileData.categoryId,
        title: fileData.title,
        description: fileData.description || null,
        fileType: fileData.fileType,
        fileUrl,
        externalUrl: fileData.externalUrl || null,
        fileSizeKb,
        uploadedByName: fileData.uploadedByName || 'طالب مجهول',
    });

    // إشعار الأدمن (async، مش بنستنى نتيجته عشان ميأخرش رد الطالب)
    notificationService
        .notifyAdminsNewPendingFile(savedFile)
        .catch((err) => console.error('فشل إرسال إشعار الأدمن:', err.message));

    return savedFile;
};

module.exports = { submitFile };
