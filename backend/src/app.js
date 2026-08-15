/**
 * app.js
 * إعداد تطبيق Express: الـ Middlewares العامة + الـ Routes + معالجة الأخطاء
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();

// ---------- Security & Parsing Middlewares ----------
app.use(helmet());                         // إضافة HTTP headers أمنية
app.use(cors({ origin: env.CLIENT_URL }));  // السماح فقط لدومين الفرونت إند
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging لكل الطلبات في وضع التطوير
}

app.use('/api', generalLimiter);

// ---------- Health Check ----------
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'الخادم يعمل بنجاح 🚀' });
});

// ---------- API Routes ----------
app.use('/api', routes);

// ---------- Error Handling (لازم يكونوا آخر حاجة) ----------
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
