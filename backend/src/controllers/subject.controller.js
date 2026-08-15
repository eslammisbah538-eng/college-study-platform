/**
 * subject.controller.js
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const subjectService = require('../services/subject.service');

const getBySemester = asyncHandler(async (req, res) => {
    const subjects = await subjectService.getSubjectsBySemester(req.params.semesterId);
    new ApiResponse(200, subjects).send(res);
});

const getOne = asyncHandler(async (req, res) => {
    const subject = await subjectService.getSubjectDetails(req.params.id);
    new ApiResponse(200, subject).send(res);
});

const getMostViewed = asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit) || 6;
    const subjects = await subjectService.getMostViewedSubjects(limit);
    new ApiResponse(200, subjects).send(res);
});

// ---------- Admin-only actions ----------
const create = asyncHandler(async (req, res) => {
    const subject = await subjectService.createSubject(req.body);
    new ApiResponse(201, subject, 'تم إضافة المادة بنجاح').send(res);
});

const update = asyncHandler(async (req, res) => {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    new ApiResponse(200, subject, 'تم تحديث المادة بنجاح').send(res);
});

const remove = asyncHandler(async (req, res) => {
    await subjectService.deleteSubject(req.params.id);
    new ApiResponse(200, null, 'تم حذف المادة بنجاح').send(res);
});

module.exports = { getBySemester, getOne, getMostViewed, create, update, remove };
