-- =====================================================
-- Full Schema File
-- الوصف: تجميع كل ملفات الـ migrations في ملف واحد
--         للتشغيل السريع على قاعدة بيانات جديدة بالكامل.
--         (نفس محتوى الملفات 001 إلى 011 مجمّعة بالترتيب الصحيح)
--
-- الاستخدام:
--   psql -U your_user -d your_database -f 000_full_schema.sql
-- =====================================================

-- ---------- 1. Universities ----------
CREATE TABLE IF NOT EXISTS universities (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(150) UNIQUE NOT NULL,
    logo_url        TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- ---------- 2. Colleges ----------
CREATE TABLE IF NOT EXISTS colleges (
    id              SERIAL PRIMARY KEY,
    university_id   INTEGER NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(150) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(university_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_colleges_university ON colleges(university_id);

-- ---------- 3. Academic Years ----------
CREATE TABLE IF NOT EXISTS academic_years (
    id              SERIAL PRIMARY KEY,
    college_id      INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name            VARCHAR(50) NOT NULL,
    order_index     SMALLINT NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_academic_years_college ON academic_years(college_id);

-- ---------- 4. Semesters ----------
CREATE TABLE IF NOT EXISTS semesters (
    id                  SERIAL PRIMARY KEY,
    academic_year_id    INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name                VARCHAR(50) NOT NULL,
    order_index         SMALLINT NOT NULL,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_semesters_academic_year ON semesters(academic_year_id);

-- ---------- 5. Subjects ----------
CREATE TABLE IF NOT EXISTS subjects (
    id              SERIAL PRIMARY KEY,
    semester_id     INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(150) NOT NULL,
    description     TEXT,
    cover_image_url TEXT,
    views_count     INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_subjects_semester ON subjects(semester_id);
CREATE INDEX IF NOT EXISTS idx_subjects_views ON subjects(views_count DESC);

-- ---------- 6. Categories ----------
CREATE TABLE IF NOT EXISTS categories (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    slug            VARCHAR(50) UNIQUE NOT NULL,
    icon            VARCHAR(50),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ---------- 7. Admins ----------
CREATE TABLE IF NOT EXISTS admins (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(20) DEFAULT 'admin',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- ---------- 8. Users ----------
CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100),
    email           VARCHAR(150) UNIQUE,
    password_hash   TEXT,
    college_id      INTEGER REFERENCES colleges(id) ON DELETE SET NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_college ON users(college_id);

-- ---------- 9. Files ----------
CREATE TABLE IF NOT EXISTS files (
    id                  SERIAL PRIMARY KEY,
    subject_id          INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    category_id         INTEGER NOT NULL REFERENCES categories(id),
    title               VARCHAR(200) NOT NULL,
    description         TEXT,
    file_type           VARCHAR(20) NOT NULL,
    file_url            TEXT,
    external_url        TEXT,
    file_size_kb         INTEGER,
    status              VARCHAR(20) NOT NULL DEFAULT 'pending',
    rejection_reason    TEXT,
    uploaded_by_name    VARCHAR(100),
    uploaded_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    views_count         INTEGER DEFAULT 0,
    downloads_count     INTEGER DEFAULT 0,
    reviewed_by         INTEGER REFERENCES admins(id) ON DELETE SET NULL,
    reviewed_at         TIMESTAMP,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_file_status CHECK (status IN ('pending', 'approved', 'rejected')),
    CONSTRAINT chk_file_type CHECK (file_type IN ('pdf', 'video', 'youtube_link', 'image', 'code', 'other'))
);
CREATE INDEX IF NOT EXISTS idx_files_subject ON files(subject_id);
CREATE INDEX IF NOT EXISTS idx_files_category ON files(category_id);
CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);
CREATE INDEX IF NOT EXISTS idx_files_created_at ON files(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_files_search ON files USING GIN (to_tsvector('simple', title));

-- ---------- 10. Notifications ----------
CREATE TABLE IF NOT EXISTS notifications (
    id              SERIAL PRIMARY KEY,
    admin_id        INTEGER REFERENCES admins(id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    message         TEXT,
    is_read         BOOLEAN DEFAULT FALSE,
    related_file_id INTEGER REFERENCES files(id) ON DELETE SET NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notifications_admin ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(admin_id, is_read) WHERE is_read = FALSE;

-- ---------- 11. Triggers for updated_at ----------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_universities_updated_at BEFORE UPDATE ON universities FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_colleges_updated_at BEFORE UPDATE ON colleges FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_academic_years_updated_at BEFORE UPDATE ON academic_years FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_semesters_updated_at BEFORE UPDATE ON semesters FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_files_updated_at BEFORE UPDATE ON files FOR EACH ROW EXECUTE FUNCTION set_updated_at();
