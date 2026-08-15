-- =====================================================
-- Migration: 001_create_universities_table
-- الوصف: جدول الجامعات (المستوى الأعلى في التسلسل الهرمي)
-- =====================================================

CREATE TABLE IF NOT EXISTS universities (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(150) UNIQUE NOT NULL,      -- يستخدم في الـ URL: /sohag-university
    logo_url        TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE universities IS 'يخزن الجامعات المدعومة في المنصة، يدعم إضافة أكثر من جامعة مستقبلاً';
