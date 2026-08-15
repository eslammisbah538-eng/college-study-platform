-- =====================================================
-- Migration: 006_create_categories_table
-- الوصف: جدول تصنيفات الملفات (كتب، ملخصات، امتحانات...)
-- =====================================================

CREATE TABLE IF NOT EXISTS categories (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,              -- مثال: "كتب", "ملخصات", "امتحانات"
    slug            VARCHAR(50) UNIQUE NOT NULL,
    icon            VARCHAR(50),                        -- اسم أيقونة من مكتبة lucide-react
    created_at      TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE categories IS 'تصنيفات الملفات، جدول منفصل بدل ENUM عشان تقدر تضيف تصنيف جديد بدون تعديل الكود';
