/**
 * adminAuth.js
 * Middleware يتحقق من وجود JWT صحيح قبل السماح بالدخول لمسارات لوحة التحكم
 */

const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');
const adminModel = require('../models/admin.model');

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw ApiError.unauthorized('يجب تسجيل الدخول للوصول لهذا المسار');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        const admin = await adminModel.findById(decoded.adminId);
        if (!admin) {
            throw ApiError.unauthorized('حساب الأدمن غير موجود');
        }

        req.admin = admin; // متاح في كل الـ controllers بعد كده
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(ApiError.unauthorized('جلسة الدخول غير صحيحة أو منتهية'));
        }
        next(error);
    }
};

module.exports = adminAuth;
