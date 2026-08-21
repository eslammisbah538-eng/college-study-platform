-- =====================================================
-- Migration: 012_create_departments_table
-- الوصف: جدول الأقسام، كل قسم تابع لكلية واحدة
-- =====================================================
CREATE TABLE IF NOT EXISTS departments (
    id              SERIAL PRIMARY KEY,
    college_id      INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,             -- مثال: "قسم الكيمياء"
    slug            VARCHAR(150) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(college_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_departments_college ON departments(college_id);
COMMENT ON TABLE departments IS 'يخزن الأقسام التابعة لكل كلية';
