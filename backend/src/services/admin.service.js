/**
 * admin.service.js
 * منطق العمل الخاص بلوحة تحكم الأدمن
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/admin.model');
const fileModel = require('../models/file.model');
const subjectModel = require('../models/subject.model');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

const login = async (email, password) => {
    const admin = await adminModel.findByEmail(email);
    if (!admin) {
        throw ApiError.unauthorized('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
        throw ApiError.unauthorized('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const token = jwt.sign({ adminId: admin.id }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });

    return {
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    };
};

const getDashboardData = async () => {
    const [stats, pendingFiles, recentFiles, mostViewedSubjects] = await Promise.all([
        fileModel.getDashboardStats(),
        fileModel.findPending(),
        fileModel.findRecentApproved(5),
        subjectModel.findMostViewed(5),
    ]);

    return {
        stats,
        pendingFilesCount: pendingFiles.length,
        pendingFiles: pendingFiles.slice(0, 10), // آخر 10 بس في الداشبورد
        recentFiles,
        mostViewedSubjects,
    };
};

const reviewFile = async (fileId, adminId, { status, rejectionReason }) => {
    const file = await fileModel.findById(fileId);
    if (!file) {
        throw ApiError.notFound('الملف غير موجود');
    }
    if (file.status !== 'pending') {
        throw ApiError.badRequest('تمت مراجعة هذا الملف بالفعل');
    }

    return fileModel.updateStatus(fileId, { status, adminId, rejectionReason });
};

const getPendingFiles = async () => {
    return fileModel.findPending();
};

module.exports = { login, getDashboardData, reviewFile, getPendingFiles };
