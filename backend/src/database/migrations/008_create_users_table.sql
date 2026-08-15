-- =====================================================
-- Migration: 008_create_users_table
-- الوصف: جدول المستخدمين (الطلاب) - غير مفعّل حاليًا في الـ API
--         لكنه موجود من الآن لتسهيل تفعيل تسجيل الدخول مستقبلاً
--         بدون الحاجة لإعادة هيكلة قاعدة البيانات
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100),
    email           VARCHAR(150) UNIQUE,
    password_hash   TEXT,
    college_id      INTEGER REFERENCES colleges(id) ON DELETE SET NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_college ON users(college_id);

COMMENT ON TABLE users IS 'حسابات الطلاب - جاهزة للتفعيل مستقبلاً (تسجيل دخول، نقاط، مفضلة...)';
