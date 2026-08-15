import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, LogOut, GraduationCap, BookOpen, FolderTree, FileStack } from 'lucide-react';

const links = [
    { to: '/admin/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { to: '/admin/pending', label: 'طلبات المراجعة', icon: Inbox },
    { to: '/admin/structure', label: 'السنوات والترمات', icon: FolderTree },
    { to: '/admin/subjects', label: 'المواد الدراسية', icon: BookOpen },
    { to: '/admin/files', label: 'الملفات المعتمدة', icon: FileStack },
];

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage?.removeItem?.('admin_token');
        navigate('/admin/login');
    };

    return (
        <aside className="flex w-60 shrink-0 flex-col gap-6 border-l border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark p-5">
            <div className="flex items-center gap-2 font-display font-black">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white">
                    <GraduationCap className="h-5 w-5" />
                </span>
                لوحة التحكم
            </div>

            <nav className="flex flex-col gap-1">
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${
                                isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                                    : 'text-ink-light dark:text-ink-dark hover:bg-ink-light/5 dark:hover:bg-ink-dark/5'
                            }`
                        }
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="focus-ring mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-bold text-danger hover:bg-danger/5"
            >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
            </button>
        </aside>
    );
}
