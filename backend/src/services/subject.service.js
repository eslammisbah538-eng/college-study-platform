/**
 * subject.service.js
 * منطق العمل الخاص بالمواد الدراسية
 */

const subjectModel = require('../models/subject.model');
const ApiError = require('../utils/ApiError');

const getSubjectsBySemester = async (semesterId) => {
    return subjectModel.findBySemester(semesterId);
};

const getSubjectDetails = async (subjectId) => {
    const subject = await subjectModel.findById(subjectId);
    if (!subject) {
        throw ApiError.notFound('المادة غير موجودة');
    }

    // كل مرة حد يفتح صفحة المادة، نزود عداد المشاهدات (بدون انتظار الرد)
    subjectModel.incrementViews(subjectId).catch(() => {});

    return subject;
};

const getMostViewedSubjects = async (limit) => {
    return subjectModel.findMostViewed(limit);
};

const createSubject = async (data) => {
    const existing = await subjectModel.findBySlug(data.slug);
    if (existing) {
        throw ApiError.badRequest('يوجد مادة أخرى بنفس الـ slug بالفعل');
    }
    return subjectModel.create(data);
};

const updateSubject = async (id, data) => {
    const updated = await subjectModel.update(id, data);
    if (!updated) {
        throw ApiError.notFound('المادة غير موجودة');
    }
    return updated;
};

const deleteSubject = async (id) => {
    const subject = await subjectModel.findById(id);
    if (!subject) {
        throw ApiError.notFound('المادة غير موجودة');
    }
    await subjectModel.remove(id);
};

module.exports = {
    getSubjectsBySemester,
    getSubjectDetails,
    getMostViewedSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
};
