/**
 * subject.model.js
 * طبقة الاتصال المباشر بقاعدة البيانات لجدول subjects
 * (مفيش منطق عمل هنا - بس SQL queries خام)
 */

const { query } = require('../config/db');

const findBySemester = async (semesterId) => {
    const { rows } = await query(
        `SELECT * FROM subjects WHERE semester_id = $1 ORDER BY name`,
        [semesterId]
    );
    return rows;
};

const findById = async (id) => {
    const { rows } = await query('SELECT * FROM subjects WHERE id = $1', [id]);
    return rows[0] || null;
};

const findBySlug = async (slug) => {
    const { rows } = await query('SELECT * FROM subjects WHERE slug = $1', [slug]);
    return rows[0] || null;
};

/**
 * أكثر المواد مشاهدة (لصفحة الرئيسية)
 */
const findMostViewed = async (limit = 6) => {
    const { rows } = await query(
        `SELECT * FROM subjects ORDER BY views_count DESC LIMIT $1`,
        [limit]
    );
    return rows;
};

const create = async ({ semesterId, name, slug, description, coverImageUrl }) => {
    const { rows } = await query(
        `INSERT INTO subjects (semester_id, name, slug, description, cover_image_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [semesterId, name, slug, description, coverImageUrl]
    );
    return rows[0];
};

const update = async (id, fields) => {
    const { name, description, coverImageUrl } = fields;
    const { rows } = await query(
        `UPDATE subjects
         SET name = COALESCE($1, name),
             description = COALESCE($2, description),
             cover_image_url = COALESCE($3, cover_image_url)
         WHERE id = $4
         RETURNING *`,
        [name, description, coverImageUrl, id]
    );
    return rows[0] || null;
};

const remove = async (id) => {
    await query('DELETE FROM subjects WHERE id = $1', [id]);
};

const incrementViews = async (id) => {
    await query('UPDATE subjects SET views_count = views_count + 1 WHERE id = $1', [id]);
};

module.exports = {
    findBySemester,
    findById,
    findBySlug,
    findMostViewed,
    create,
    update,
    remove,
    incrementViews,
};
