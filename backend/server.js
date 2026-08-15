/**
 * server.js
 * نقطة الدخول الرئيسية للتطبيق - بيشغّل الـ HTTP server
 */

const app = require('./src/app');
const env = require('./src/config/env');
const { pool } = require('./src/config/db');

const server = app.listen(env.PORT, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${env.PORT}`);
    console.log(`🌍 البيئة: ${env.NODE_ENV}`);
});

// إغلاق آمن للاتصالات عند إيقاف السيرفر (Ctrl+C أو من الاستضافة)
const gracefulShutdown = async () => {
    console.log('\n🛑 جاري إيقاف الخادم بأمان...');
    server.close(async () => {
        await pool.end();
        console.log('✅ تم إغلاق كل الاتصالات بنجاح');
        process.exit(0);
    });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    gracefulShutdown();
});
