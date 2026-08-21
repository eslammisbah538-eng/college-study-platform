-- =====================================================
-- Migration: 013_alter_academic_years_add_department
-- الوصف: تعديل جدول الفرق الدراسية ليتبع القسم بدل الكلية مباشرة
-- ملاحظة: بيمسح أي فرق دراسية قديمة (بيانات تجريبية) لأن الربط اتغير
-- =====================================================
DELETE FROM academic_years;

ALTER TABLE academic_years
    DROP COLUMN IF EXISTS college_id;

ALTER TABLE academic_years
    ADD COLUMN department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_academic_years_department ON academic_years(department_id);
