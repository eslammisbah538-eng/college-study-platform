/**
 * file.model.js
 * طبقة الاتصال المباشر بقاعدة البيانات لجدول files
 */

const { query } = require('../config/db');

const findBySubject = async (subjectId, status = 'approved') => {
    const { rows } = await query(
        `SELECT f.*, c.name AS category_name, c.slug AS category_slug
         FROM files f
         JOIN categories c ON c.id = f.category_id
         WHERE f.subject_id = $1 AND f.status = $2
         ORDER BY f.created_at DESC`,
        [subjectId, status]
    );
    return rows;
};

const findById = async (id) => {
    const { rows } = await query('SELECT * FROM files WHERE id = $1', [id]);
    return rows[0] || null;
};

/**
 * كل الملفات المعلّقة (لوحة تحكم الأدمن)
 */
const findPending = async () => {
    const { rows } = await query(
        `SELECT f.*, s.name AS subject_name, c.name AS category_name
         FROM files f
         JOIN subjects s ON s.id = f.subject_id
         JOIN categories c ON c.id = f.category_id
         WHERE f.status = 'pending'
         ORDER BY f.created_at ASC`
    );
    return rows;
};

/**
 * أحدث الملفات المعتمدة (لصفحة الرئيسية)
 */
const findRecentApproved = async (limit = 10) => {
    const { rows } = await query(
        `SELECT f.*, s.name AS subject_name
         FROM files f
         JOIN subjects s ON s.id = f.subject_id
         WHERE f.status = 'approved'
         ORDER BY f.created_at DESC
         LIMIT $1`,
        [limit]
    );
    return rows;
};

/**
 * البحث العام (Full-Text Search) - عن اسم ملف
 */
const searchFiles = async (searchTerm, limit = 20) => {
    const { rows } = await query(
        `SELECT f.*, s.name AS subject_name
         FROM files f
         JOIN subjects s ON s.id = f.subject_id
         WHERE f.status = 'approved'
           AND to_tsvector('simple', f.title) @@ plainto_tsquery('simple', $1)
         LIMIT $2`,
        [searchTerm, limit]
    );
    return rows;
};

const create = async (fileData) => {
    const {
        subjectId, categoryId, title, description,
        fileType, fileUrl, externalUrl, fileSizeKb, uploadedByName,
    } = fileData;

    const { rows } = await query(
        `INSERT INTO files
            (subject_id, category_id, title, description, file_type,
             file_url, external_url, file_size_kb, uploaded_by_name, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
         RETURNING *`,
        [subjectId, categoryId, title, description, fileType,
            fileUrl, externalUrl, fileSizeKb, uploadedByName]
    );
    return rows[0];
};

const updateStatus = async (id, { status, adminId, rejectionReason = null }) => {
    const { rows } = await query(
        `UPDATE files
         SET status = $1, reviewed_by = $2, reviewed_at = NOW(), rejection_reason = $3
         WHERE id = $4
         RETURNING *`,
        [status, adminId, rejectionReason, id]
    );
    return rows[0] || null;
};

const update = async (id, fields) => {
    const { title, description, categoryId } = fields;
    const { rows } = await query(
        `UPDATE files
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             category_id = COALESCE($3, category_id)
         WHERE id = $4
         RETURNING *`,
        [title, description, categoryId, id]
    );
    return rows[0] || null;
};

const remove = async (id) => {
    await query('DELETE FROM files WHERE id = $1', [id]);
};

const incrementViews = async (id) => {
    await query('UPDATE files SET views_count = views_count + 1 WHERE id = $1', [id]);
};

const incrementDownloads = async (id) => {
    await query('UPDATE files SET downloads_count = downloads_count + 1 WHERE id = $1', [id]);
};

/**
 * إحصائيات لوحة تحكم الأدمن
 */
const getDashboardStats = async () => {
    const { rows } = await query(`
        SELECT
            (SELECT COUNT(*) FROM files WHERE status = 'approved') AS total_files,
            (SELECT COUNT(*) FROM files WHERE status = 'pending') AS pending_files,
            (SELECT COUNT(*) FROM subjects) AS total_subjects,
            (SELECT COUNT(*) FROM academic_years) AS total_years
    `);
    return rows[0];
};

module.exports = {
    findBySubject,
    findById,
    findPending,
    findRecentApproved,
    searchFiles,
    create,
    updateStatus,
    update,
    remove,
    incrementViews,
    incrementDownloads,
    getDashboardStats,
};
