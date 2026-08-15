/**
 * validateRequest.js
 * Middleware عام يستقبل أي Zod schema ويتحقق من req.body
 * لو البيانات غلط، بيوقف الـ request فورًا برسالة خطأ واضحة
 * لو صحيحة، بيستبدل req.body بالنسخة المتحقق منها (بعد الـ coercion)
 *
 * الاستخدام:
 *   router.post('/', validateRequest(uploadFileSchema), fileController.upload)
 */

const ApiError = require('../utils/ApiError');

const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));
        return next(ApiError.badRequest('فشل التحقق من صحة البيانات', formattedErrors));
    }

    req.body = result.data;
    next();
};

module.exports = validateRequest;
