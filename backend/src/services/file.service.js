/**
 * file.service.js
 * منطق العمل الخاص بعرض/تعديل/حذف الملفات (عكس عملية الرفع الموجودة في upload.service.js)
 */

const fileModel = require('../models/file.model');
const ApiError = require('../utils/ApiError');

const getFilesBySubject = async (subjectId) => {
    return fileModel.findBySubject(subjectId, 'approved');
};

const getFileAndTrackDownload = async (fileId) => {
    const file = await fileModel.findById(fileId);
    if (!file || file.status !== 'approved') {
        throw ApiError.notFound('الملف غير موجود أو غير متاح حاليًا');
    }
    fileModel.incrementDownloads(fileId).catch(() => {});
    return file;
};

const getRecentFiles = async (limit) => {
    return fileModel.findRecentApproved(limit);
};

const searchFiles = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
        throw ApiError.badRequest('يجب إدخال كلمة بحث من حرفين على الأقل');
    }
    return fileModel.searchFiles(searchTerm.trim());
};

const updateFile = async (id, data) => {
    const updated = await fileModel.update(id, data);
    if (!updated) {
        throw ApiError.notFound('الملف غير موجود');
    }
    return updated;
};

const deleteFile = async (id) => {
    const file = await fileModel.findById(id);
    if (!file) {
        throw ApiError.notFound('الملف غير موجود');
    }
    await fileModel.remove(id);
};

module.exports = {
    getFilesBySubject,
    getFileAndTrackDownload,
    getRecentFiles,
    searchFiles,
    updateFile,
    deleteFile,
};
