-- =====================================================
-- Migration: 010_update_file_types
-- الوصف: تحديث أنواع الملفات المسموحة
--        من: pdf | video | youtube_link | image | code | other
--        إلى: pdf | link | image
-- =====================================================

-- حذف الـ constraint القديم
ALTER TABLE files DROP CONSTRAINT chk_file_type;

-- إضافة الـ constraint الجديد بأنواع الملفات الجديدة
ALTER TABLE files ADD CONSTRAINT chk_file_type CHECK (file_type IN ('pdf', 'link', 'image'));

COMMENT ON COLUMN files.file_type IS 'نوع الملف: pdf (ملف PDF) | link (رابط فيديو أو موقع) | image (صورة)';
