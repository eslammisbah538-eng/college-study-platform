/**
 * file.validator.js
 * Schemas للتحقق من صحة البيانات القادمة من العميل قبل ما توصل للـ Controller
 * باستخدام مكتبة zod
 */

const { z } = require('zod');

const uploadFileSchema = z.object({
    subjectId: z.coerce.number().int().positive({ message: 'subjectId مطلوب ويجب أن يكون رقمًا صحيحًا' }),
    categoryId: z.coerce.number().int().positive({ message: 'categoryId مطلوب' }),
    title: z.string().trim().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل').max(200),
    description: z.string().trim().max(1000).optional(),
    fileType: z.enum(['pdf', 'link', 'image']),
    externalUrl: z.string().url('رابط غير صحيح').optional(),
    uploadedByName: z.string().trim().max(100).optional(),
});

const updateFileSchema = z.object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().max(1000).optional(),
    categoryId: z.coerce.number().int().positive().optional(),
});

const reviewFileSchema = z.object({
    status: z.enum(['approved', 'rejected'], {
        errorMap: () => ({ message: "status يجب أن يكون 'approved' أو 'rejected'" }),
    }),
    rejectionReason: z.string().trim().max(500).optional(),
});

module.exports = { uploadFileSchema, updateFileSchema, reviewFileSchema };
