import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * items: [{ label: string, to?: string }]
 * آخر عنصر بدون رابط (الصفحة الحالية)
 */
export default function Breadcrumb({ items }) {
    return (
        <nav aria-label="مسار التنقل" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
            <Link to="/" className="hover:text-primary-500">الرئيسية</Link>
            {items.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {item.to ? (
                        <Link to={item.to} className="hover:text-primary-500">{item.label}</Link>
                    ) : (
                        <span className="font-bold text-ink-light dark:text-ink-dark">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
