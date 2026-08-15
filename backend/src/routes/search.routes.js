/**
 * search.routes.js
 * GET /api/search?q=كلمة البحث
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/file.controller');

router.get('/search', controller.search);

module.exports = router;
