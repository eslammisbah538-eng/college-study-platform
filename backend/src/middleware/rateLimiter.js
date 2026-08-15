/**
 * rateLimiter.js
 * حماية الـ API من الإساءة (Brute-force / Spam) بتحديد عدد الطلبات المسموحة
 */

const rateLimit = require('express-rate-limit');

// عام: لكل الـ API
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 200,                  // 200 طلب لكل IP خلال المدة دي
    message: { success: false, message: 'طلبات كثيرة جدًا، حاول مرة أخرى بعد قليل' },
    standardHeaders: true,
    legacyHeaders: false,
});

// أكثر تشددًا: على رفع الملفات تحديدًا، عشان نمنع رفع عشوائي مكثف
const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // ساعة
    max: 10,                   // 10 عمليات رفع فقط في الساعة لكل IP
    message: { success: false, message: 'تم تجاوز الحد المسموح لرفع الملفات، حاول لاحقًا' },
    standardHeaders: true,
    legacyHeaders: false,
});

// تسجيل دخول الأدمن: منع محاولات تخمين كلمة المرور
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'محاولات دخول كثيرة، حاول بعد 15 دقيقة' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { generalLimiter, uploadLimiter, loginLimiter };
