-- =====================================================
-- Migration: 004_create_semesters_table
-- الوصف: جدول الترمات، كل ترم تابع لسنة دراسية واحدة
-- =====================================================

CREATE TABLE IF NOT EXISTS semesters (
    id                  SERIAL PRIMARY KEY,
    academic_year_id    INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name                VARCHAR(50) NOT NULL,          -- مثال: "الترم الأول"
    order_index         SMALLINT NOT NULL,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_semesters_academic_year ON semesters(academic_year_id);

COMMENT ON TABLE semesters IS 'يخزن الترمات (الفصول الدراسية) لكل سنة دراسية';
