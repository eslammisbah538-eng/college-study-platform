/**
 * runMigrations.js
 * سكريبت بسيط بيقرأ كل ملفات migrations بالترتيب وينفذها على قاعدة البيانات
 * الاستخدام: npm run migrate
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const MIGRATIONS_DIR = path.join(__dirname, '../src/database/migrations');

const runMigrations = async () => {
    // بنستبعد ملف 000_full_schema.sql عشان مش هننفذه مع الباقي (بديل بديل مش جزء من التسلسل)
    const files = fs
        .readdirSync(MIGRATIONS_DIR)
        .filter((file) => file.endsWith('.sql') && file !== '000_full_schema.sql')
        .sort();

    console.log(`📂 تم العثور على ${files.length} ملف migration`);

    for (const file of files) {
        const filePath = path.join(MIGRATIONS_DIR, file);
        const sql = fs.readFileSync(filePath, 'utf-8');

        console.log(`⏳ تشغيل: ${file}...`);
        await pool.query(sql);
        console.log(`✅ تم بنجاح: ${file}`);
    }

    console.log('🎉 تم تنفيذ كل الـ migrations بنجاح');
    await pool.end();
};

runMigrations().catch((err) => {
    console.error('❌ فشل تنفيذ الـ migrations:', err.message);
    process.exit(1);
});
