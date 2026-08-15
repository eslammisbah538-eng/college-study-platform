-- =====================================================
-- Migration: 005_create_subjects_table
-- الوصف: جدول المواد الدراسية، كل مادة تابعة لترم واحد
-- =====================================================

CREATE TABLE IF NOT EXISTS subjects (
    id              SERIAL PRIMARY KEY,
    semester_id     INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,             -- مثال: "برمجة 1"
    slug            VARCHAR(150) NOT NULL,
    description     TEXT,
    cover_image_url TEXT,
    views_count     INTEGER DEFAULT 0,                  -- لعرض "أكثر المواد استخدامًا"
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subjects_semester ON subjects(semester_id);
CREATE INDEX IF NOT EXISTS idx_subjects_views ON subjects(views_count DESC);

COMMENT ON TABLE subjects IS 'يخزن المواد الدراسية لكل ترم';
