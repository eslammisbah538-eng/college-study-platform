-- =====================================================
-- Migration: 010_create_notifications_table
-- الوصف: جدول إشعارات الأدمن (مثلاً: "ملف جديد بانتظار المراجعة")
-- =====================================================

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

COMMENT ON TABLE notifications IS 'إشعارات لوحة تحكم الأدمن (طلبات رفع جديدة، تحديثات...)';
