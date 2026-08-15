/**
 * db.js
 * إعداد الاتصال بقاعدة بيانات PostgreSQL باستخدام Connection Pool
 * الـ Pool أفضل من اتصال واحد لأنه بيدير عدة اتصالات متزامنة بكفاءة
 */

const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,                    // أقصى عدد اتصالات مفتوحة في نفس الوقت
    idleTimeoutMillis: 30000,   // إغلاق الاتصال الخامل بعد 30 ثانية
});

pool.on('error', (err) => {
    console.error('❌ خطأ غير متوقع في PostgreSQL Pool:', err.message);
});

/**
 * دالة موحدة لتنفيذ الاستعلامات
 * بتستخدمها كل الـ Models بدل ما كل واحد يعمل pool.query بنفسه
 * ده بيسهّل إضافة Logging أو قياس الأداء مستقبلاً في مكان واحد
 */
const query = async (text, params) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (env.NODE_ENV === 'development') {
        console.log('📊 SQL Query:', { text, duration: `${duration}ms`, rows: result.rowCount });
    }

    return result;
};

/**
 * لتنفيذ عدة استعلامات داخل Transaction واحدة
 * (مفيد مثلاً: حفظ ملف + إنشاء إشعار في نفس الوقت، لو فشل أحدهما يترجع الاتنين)
 */
const getClient = () => pool.connect();

module.exports = { query, getClient, pool };
