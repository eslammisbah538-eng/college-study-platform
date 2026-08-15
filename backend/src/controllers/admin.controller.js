/**
 * admin.controller.js
 */

const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const adminService = require('../services/admin.service');
const notificationService = require('../services/notification.service');

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await adminService.login(email, password);
    new ApiResponse(200, result, 'تم تسجيل الدخول بنجاح').send(res);
});

const getDashboard = asyncHandler(async (req, res) => {
    const data = await adminService.getDashboardData();
    new ApiResponse(200, data).send(res);
});

const getPendingFiles = asyncHandler(async (req, res) => {
    const files = await adminService.getPendingFiles();
    new ApiResponse(200, files).send(res);
});

/**
 * قبول أو رفض ملف معلّق
 * body: { status: 'approved' | 'rejected', rejectionReason?: string }
 */
const reviewFile = asyncHandler(async (req, res) => {
    const adminId = req.admin.id; // متاح بفضل adminAuth middleware
    const file = await adminService.reviewFile(req.params.fileId, adminId, req.body);

    const message = req.body.status === 'approved'
        ? 'تم قبول الملف ونشره في الموقع'
        : 'تم رفض الملف';

    new ApiResponse(200, file, message).send(res);
});

const getMyNotifications = asyncHandler(async (req, res) => {
    const unreadOnly = req.query.unread === 'true';
    const notifications = await notificationService.getAdminNotifications(req.admin.id, unreadOnly);
    new ApiResponse(200, notifications).send(res);
});

const markNotificationRead = asyncHandler(async (req, res) => {
    await notificationService.markNotificationRead(req.params.notificationId);
    new ApiResponse(200, null, 'تم تحديد الإشعار كمقروء').send(res);
});

module.exports = {
    login,
    getDashboard,
    getPendingFiles,
    reviewFile,
    getMyNotifications,
    markNotificationRead,
};
