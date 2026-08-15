/**
 * errorHandler.js
 * Middleware مركزي لمعالجة كل الأخطاء في التطبيق
 * لازم يتحط آخر حاجة في app.js بعد كل الـ routes
 */

const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'حدث خطأ غير متوقع في الخادم';

    if (env.NODE_ENV === 'development') {
        console.error('❌ Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        // نعرض الـ stack trace بس في بيئة التطوير عشان الأمان
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

/**
 * Middleware للتعامل مع أي مسار غير موجود (404)
 */
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `المسار ${req.originalUrl} غير موجود`,
    });
};

module.exports = { errorHandler, notFoundHandler };
