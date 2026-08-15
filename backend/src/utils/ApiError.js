/**
 * ApiError.js
 * كلاس موحد لكل الأخطاء في التطبيق
 * بدل ما كل Controller يرمي شكل خطأ مختلف، كله بيمر من هنا
 * وبيتمسك في مكان واحد جوه errorHandler middleware
 */

class ApiError extends Error {
    /**
     * @param {number} statusCode - كود الحالة HTTP (400, 404, 500...)
     * @param {string} message - رسالة الخطأ
     * @param {Array} errors - تفاصيل إضافية (مثلاً أخطاء Validation)
     */
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'بيانات غير صحيحة', errors = []) {
        return new ApiError(400, message, errors);
    }

    static notFound(message = 'العنصر المطلوب غير موجود') {
        return new ApiError(404, message);
    }

    static unauthorized(message = 'غير مصرح لك بالدخول') {
        return new ApiError(401, message);
    }

    static forbidden(message = 'ليس لديك صلاحية لهذا الإجراء') {
        return new ApiError(403, message);
    }

    static internal(message = 'حدث خطأ في الخادم') {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;
