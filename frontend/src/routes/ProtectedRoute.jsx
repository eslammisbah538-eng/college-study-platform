import { Navigate } from 'react-router-dom';

/**
 * بيتحقق من وجود توكن الأدمن قبل السماح بدخول لوحة التحكم
 * (تحقق أولي بسيط في الواجهة - الحماية الحقيقية دايمًا في الباك إند)
 */
export default function ProtectedRoute({ children }) {
    const token = window.localStorage?.getItem?.('admin_token');
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
}
