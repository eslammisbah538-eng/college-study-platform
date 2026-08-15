/**
 * ApiResponse.js
 * كلاس موحد لشكل الاستجابة الناجحة، عشان كل الـ Endpoints
 * ترجع نفس الشكل بالظبط للـ Frontend: { success, message, data }
 */

class ApiResponse {
    constructor(statusCode, data, message = 'تمت العملية بنجاح') {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data,
        });
    }
}

module.exports = ApiResponse;
