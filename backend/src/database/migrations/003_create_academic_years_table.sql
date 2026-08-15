-- =====================================================
-- Migration: 003_create_academic_years_table
-- الوصف: جدول السنوات/الفرق الدراسية، كل سنة تابعة لكلية واحدة
-- =====================================================

CREATE TABLE IF NOT EXISTS academic_years (
    id              SERIAL PRIMARY KEY,
    college_id      INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name            VARCHAR(50) NOT NULL,              -- مثال: "الفرقة الأولى"
    order_index     SMALLINT NOT NULL,                  -- لترتيب العرض: 1, 2, 3, 4
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academic_years_college ON academic_years(college_id);

COMMENT ON TABLE academic_years IS 'يخزن السنوات الدراسية (الفرق) لكل كلية';
