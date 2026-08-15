import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 15000,
});

// إرفاق التوكن تلقائيًا مع كل طلب لو الأدمن مسجل دخول
api.interceptors.request.use((config) => {
    const token = window.localStorage?.getItem?.('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// لو التوكن انتهت صلاحيته، نرجّع الأدمن لصفحة الدخول
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            window.localStorage?.removeItem?.('admin_token');
        }
        return Promise.reject(error);
    }
);

export default api;
