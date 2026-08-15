/**
 * subject.validator.js
 */

const { z } = require('zod');

const createSubjectSchema = z.object({
    semesterId: z.coerce.number().int().positive({ message: 'semesterId مطلوب' }),
    name: z.string().trim().min(2, 'اسم المادة قصير جدًا').max(150),
    slug: z.string().trim().min(2).max(150)
        .regex(/^[a-z0-9-]+$/, 'الـ slug يجب أن يحتوي على حروف إنجليزية صغيرة وأرقام وشرطات فقط'),
    description: z.string().trim().max(1000).optional(),
});

const updateSubjectSchema = createSubjectSchema.partial();

module.exports = { createSubjectSchema, updateSubjectSchema };
