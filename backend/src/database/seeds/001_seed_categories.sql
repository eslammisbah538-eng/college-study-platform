INSERT INTO categories (name, slug, icon) VALUES
    ('ملخصات',      'summaries',       'notebook-pen'),
    ('كتب',         'books',           'book-open'),
    ('امتحانات',    'exams',           'clipboard-check'),
    ('روابط فيديو', 'video-links',     'video')
ON CONFLICT (slug) DO NOTHING;
