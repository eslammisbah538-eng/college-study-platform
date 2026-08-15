/**
 * admin.model.js
 */

const { query } = require('../config/db');

const findByEmail = async (email) => {
    const { rows } = await query('SELECT * FROM admins WHERE email = $1', [email]);
    return rows[0] || null;
};

const findById = async (id) => {
    const { rows } = await query(
        'SELECT id, name, email, role, created_at FROM admins WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};

module.exports = { findByEmail, findById };
