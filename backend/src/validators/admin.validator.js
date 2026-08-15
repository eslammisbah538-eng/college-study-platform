/**
 * admin.validator.js
 */

const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().trim().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

module.exports = { loginSchema };
