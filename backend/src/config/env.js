/**
 * env.js
 * نقطة مركزية لقراءة متغيرات البيئة (Environment Variables)
 * بدل ما نكتب process.env.XXX في كل مكان في الكود
 */

require('dotenv').config();

const env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // PostgreSQL
    DATABASE_URL: process.env.DATABASE_URL,

    // Supabase Storage
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME || 'study-files',

    // Admin Auth (جاهز للتفعيل)
    JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret_in_production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

    // Frontend URL (لـ CORS)
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

// تحقق مبكر من وجود المتغيرات الأساسية عشان السيرفر ميشتغلش بإعدادات ناقصة
const requiredVars = ['DATABASE_URL'];
for (const key of requiredVars) {
    if (!env[key]) {
        console.error(`❌ متغير البيئة المطلوب غير موجود: ${key}`);
        process.exit(1);
    }
}

module.exports = env;
