/**
 * category.routes.js
 * GET /api/categories
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/category.controller');

router.get('/categories', controller.getAll);

module.exports = router;
