/**
 * asyncHandler.js
 * بيغلّف أي async function (زي دوال الـ Controllers) عشان لو حصل خطأ
 * يتبعت تلقائيًا لـ next(error) بدل ما نكتب try/catch في كل controller
 *
 * الاستخدام:
 *   exports.getSubject = asyncHandler(async (req, res) => { ... });
 */

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;
