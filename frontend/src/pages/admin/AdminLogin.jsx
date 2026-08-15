import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn } from 'lucide-react';
import Button from '../../components/common/Button';
import { adminService } from '../../services/adminService';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { token } = await adminService.login(form.email, form.password);
            window.localStorage?.setItem?.('admin_token', token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || 'بيانات الدخول غير صحيحة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-card bg-surface-light dark:bg-surface-dark p-8 shadow-card"
            >
                <div className="mb-6 flex flex-col items-center gap-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                        <GraduationCap className="h-6 w-6" />
                    </span>
                    <h1 className="font-display text-xl font-bold">دخول لوحة التحكم</h1>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold">البريد الإلكتروني</span>
                        <input
                            required
                            type="email"
                            className="input-field"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        />
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold">كلمة المرور</span>
                        <input
                            required
                            type="password"
                            className="input-field"
                            value={form.password}
                            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                        />
                    </label>

                    {error && <p className="text-sm text-danger">{error}</p>}

                    <Button type="submit" disabled={loading} className="w-full">
                        <LogIn className="h-4 w-4" />
                        {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
