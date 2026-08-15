-- =====================================================
-- Seed: 002_seed_demo_structure
-- الوصف: بيانات تجريبية لبدء التطوير عليها محليًا
--         (يمكن حذف هذا الملف أو تعديله بالبيانات الحقيقية)
-- =====================================================

INSERT INTO universities (name, slug) VALUES
    ('جامعة سوهاج', 'sohag-university')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO colleges (university_id, name, slug)
SELECT id, 'كلية العلوم', 'faculty-of-science'
FROM universities WHERE slug = 'sohag-university'
ON CONFLICT (university_id, slug) DO NOTHING;

INSERT INTO academic_years (college_id, name, order_index)
SELECT id, 'الفرقة الأولى', 1 FROM colleges WHERE slug = 'faculty-of-science'
UNION ALL
SELECT id, 'الفرقة الثانية', 2 FROM colleges WHERE slug = 'faculty-of-science';

INSERT INTO semesters (academic_year_id, name, order_index)
SELECT id, 'الترم الأول', 1 FROM academic_years WHERE name = 'الفرقة الثانية'
UNION ALL
SELECT id, 'الترم الثاني', 2 FROM academic_years WHERE name = 'الفرقة الثانية';
