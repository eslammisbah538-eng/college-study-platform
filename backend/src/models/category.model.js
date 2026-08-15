/**
 * category.model.js
 */

const { query } = require('../config/db');

const findAll = async () => {
    const { rows } = await query('SELECT * FROM categories ORDER BY id');
    return rows;
};

const findById = async (id) => {
    const { rows } = await query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0] || null;
};

module.exports = { findAll, findById };
