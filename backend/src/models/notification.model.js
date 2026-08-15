/**
 * notification.model.js
 */

const { query } = require('../config/db');

const findAllAdminIds = async () => {
    const { rows } = await query('SELECT id FROM admins');
    return rows.map((r) => r.id);
};

const create = async ({ adminId, title, message, relatedFileId }) => {
    const { rows } = await query(
        `INSERT INTO notifications (admin_id, title, message, related_file_id)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [adminId, title, message, relatedFileId]
    );
    return rows[0];
};

const findByAdmin = async (adminId, unreadOnly = false) => {
    const condition = unreadOnly ? 'AND is_read = FALSE' : '';
    const { rows } = await query(
        `SELECT * FROM notifications WHERE admin_id = $1 ${condition} ORDER BY created_at DESC`,
        [adminId]
    );
    return rows;
};

const markAsRead = async (id) => {
    await query('UPDATE notifications SET is_read = TRUE WHERE id = $1', [id]);
};

module.exports = { findAllAdminIds, create, findByAdmin, markAsRead };
