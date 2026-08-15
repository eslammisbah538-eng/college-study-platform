-- =====================================================
-- Migration: 009_create_files_table
-- الوصف: جدول الملفات - قلب النظام (كتب، PDF، فيديو، امتحانات...)
--         حالة الملف (status) تُستخدم أيضًا كـ "طلب رفع" بدون
--         الحاجة لجدول upload_requests منفصل
-- =====================================================

CREATE TABLE IF NOT EXISTS files (
    id                  SERIAL PRIMARY KEY,
    subject_id          INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    category_id         INTEGER NOT NULL REFERENCES categories(id),

    title               VARCHAR(200) NOT NULL,
    description         TEXT,

    file_type           VARCHAR(20) NOT NULL,           -- 'pdf' | 'video' | 'youtube_link' | 'image' | 'code'
    file_url            TEXT,                            -- رابط Supabase Storage (لو ملف مرفوع فعليًا)
    external_url        TEXT,                            -- رابط خارجي (يوتيوب مثلاً)
    file_size_kb         INTEGER,

    status              VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
    rejection_reason    TEXT,

    uploaded_by_name    VARCHAR(100),                    -- اسم الطالب (اختياري، بدون حساب)
    uploaded_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- جاهز مستقبلاً لو فُعّل تسجيل الدخول

    views_count         INTEGER DEFAULT 0,
    downloads_count     INTEGER DEFAULT 0,

    reviewed_by         INTEGER REFERENCES admins(id) ON DELETE SET NULL,
    reviewed_at         TIMESTAMP,

    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW(),

    CONSTRAINT chk_file_status CHECK (status IN ('pending', 'approved', 'rejected')),
    CONSTRAINT chk_file_type CHECK (file_type IN ('pdf', 'video', 'youtube_link', 'image', 'code', 'other'))
);

-- فهارس لتسريع الاستعلامات الأكثر استخدامًا
CREATE INDEX IF NOT EXISTS idx_files_subject ON files(subject_id);
CREATE INDEX IF NOT EXISTS idx_files_category ON files(category_id);
CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);
CREATE INDEX IF NOT EXISTS idx_files_created_at ON files(created_at DESC);

-- فهرس بحث نصي كامل (Full-Text Search) لتسريع البحث العام في الموقع
CREATE INDEX IF NOT EXISTS idx_files_search ON files USING GIN (to_tsvector('simple', title));

COMMENT ON TABLE files IS 'الجدول المركزي لكل الملفات في المنصة، بما فيها الملفات المعلّقة (pending) من رفع الطلاب';
