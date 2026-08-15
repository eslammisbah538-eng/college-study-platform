/**
 * index.js (routes)
 * نقطة تجميع مركزية لكل الـ Routes، بيتم استيراده مرة واحدة في app.js
 */

const express = require('express');
const router = express.Router();

router.use('/', require('./academicStructure.routes'));
router.use('/', require('./subject.routes'));
router.use('/', require('./file.routes'));
router.use('/', require('./search.routes'));
router.use('/', require('./upload.routes'));
router.use('/', require('./admin.routes'));
router.use('/', require('./category.routes'));

module.exports = router;
