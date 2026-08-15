-- =====================================================
-- Migration: 002_create_colleges_table
-- الوصف: جدول الكليات، كل كلية تابعة لجامعة واحدة
-- =====================================================

CREATE TABLE IF NOT EXISTS colleges (
    id              SERIAL PRIMARY KEY,
    university_id   INTEGER NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,             -- مثال: "كلية العلوم"
    slug            VARCHAR(150) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),

    UNIQUE(university_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_colleges_university ON colleges(university_id);

COMMENT ON TABLE colleges IS 'يخزن الكليات التابعة لكل جامعة';
