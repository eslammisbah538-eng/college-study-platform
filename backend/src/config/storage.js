/**
 * storage.js
 * إعداد الاتصال بـ Supabase Storage لرفع وحذف الملفات (PDF, صور, فيديوهات)
 */

const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

const BUCKET_NAME = env.SUPABASE_BUCKET_NAME;

/**
 * رفع ملف إلى Supabase Storage
 * @param {Buffer} fileBuffer - محتوى الملف
 * @param {string} fileName - اسم الملف الفريد (يُفضّل توليده بـ uuid + الامتداد الأصلي)
 * @param {string} mimeType - نوع الملف
 * @returns {Promise<string>} الرابط العام للملف
 */
const uploadFile = async (fileBuffer, fileName, mimeType) => {
    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, fileBuffer, {
            contentType: mimeType,
            upsert: false,
        });

    if (error) {
        throw new Error(`فشل رفع الملف إلى Supabase Storage: ${error.message}`);
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    return data.publicUrl;
};

/**
 * حذف ملف من Supabase Storage
 * @param {string} fileName - اسم الملف كما تم تخزينه
 */
const deleteFile = async (fileName) => {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

    if (error) {
        throw new Error(`فشل حذف الملف من Supabase Storage: ${error.message}`);
    }
};

module.exports = { uploadFile, deleteFile, supabase };
