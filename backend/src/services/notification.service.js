/**
 * notification.service.js
 */

const notificationModel = require('../models/notification.model');

/**
 * إرسال إشعار لكل الأدمنز لما يتضاف ملف جديد بحالة pending
 */
const notifyAdminsNewPendingFile = async (file) => {
    const adminIds = await notificationModel.findAllAdminIds();

    await Promise.all(
        adminIds.map((adminId) =>
            notificationModel.create({
                adminId,
                title: 'ملف جديد بانتظار المراجعة',
                message: `تم رفع ملف بعنوان "${file.title}" وينتظر موافقتك`,
                relatedFileId: file.id,
            })
        )
    );
};

const getAdminNotifications = async (adminId, unreadOnly) => {
    return notificationModel.findByAdmin(adminId, unreadOnly);
};

const markNotificationRead = async (id) => {
    await notificationModel.markAsRead(id);
};

module.exports = { notifyAdminsNewPendingFile, getAdminNotifications, markNotificationRead };
