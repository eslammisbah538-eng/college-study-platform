-- =====================================================
-- Seed: 001_seed_categories
-- الوصف: التصنيفات الأساسية المطلوبة في المشروع
-- =====================================================

INSERT INTO categories (name, slug, icon) VALUES
    ('كتب',        'books',         'book-open'),
    ('ملفات PDF',  'pdf-files',      'file-text'),
    ('فيديوهات',   'videos',         'video'),
    ('روابط يوتيوب', 'youtube-links', 'youtube'),
    ('ملخصات',     'summaries',      'notebook-pen'),
    ('امتحانات',   'exams',          'clipboard-check'),
    ('مشاريع',     'projects',       'folder-kanban'),
    ('أكواد',      'codes',          'code')
ON CONFLICT (slug) DO NOTHING;
