-- =====================================================
-- Migration: 007_create_admins_table
-- الوصف: جدول حسابات الأدمن (لوحة التحكم)
-- =====================================================

CREATE TABLE IF NOT EXISTS admins (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(20) DEFAULT 'admin',        -- جاهز مستقبلاً لـ 'super_admin'
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE admins IS 'حسابات المشرفين على المنصة';
