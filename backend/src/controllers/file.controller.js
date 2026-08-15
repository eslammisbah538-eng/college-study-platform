/**
 * file.controller.js
 * خاص بعرض/بحث/تحميل الملفات المعتمدة فقط (الطلاب)
 * عمليات الرفع في upload.controller.js، ومراجعة الأدمن في admin.controller.js
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const fileService = require('../services/file.service');

const getBySubject = asyncHandler(async (req, res) => {
    const files = await fileService.getFilesBySubject(req.params.subjectId);
    new ApiResponse(200, files).send(res);
});

const getOne = asyncHandler(async (req, res) => {
    const file = await fileService.getFileAndTrackDownload(req.params.id);
    new ApiResponse(200, file).send(res);
});

const getRecent = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const files = await fileService.getRecentFiles(limit);
    new ApiResponse(200, files).send(res);
});

const search = asyncHandler(async (req, res) => {
    const results = await fileService.searchFiles(req.query.q);
    new ApiResponse(200, results).send(res);
});

// ---------- Admin-only actions ----------
const update = asyncHandler(async (req, res) => {
    const file = await fileService.updateFile(req.params.id, req.body);
    new ApiResponse(200, file, 'تم تحديث بيانات الملف بنجاح').send(res);
});

const remove = asyncHandler(async (req, res) => {
    await fileService.deleteFile(req.params.id);
    new ApiResponse(200, null, 'تم حذف الملف بنجاح').send(res);
});

module.exports = { getBySubject, getOne, getRecent, search, update, remove };
