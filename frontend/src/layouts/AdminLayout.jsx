import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import ThemeToggle from '../components/layout/ThemeToggle';

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1">
                <header className="flex items-center justify-end border-b border-ink-light/10 dark:border-ink-dark/10 px-6 py-3">
                    <ThemeToggle />
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
