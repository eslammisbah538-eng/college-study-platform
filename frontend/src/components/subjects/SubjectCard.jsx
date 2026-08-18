import { Link } from 'react-router-dom';
import { BookMarked, Eye, ArrowLeft } from 'lucide-react';

export default function SubjectCard({ subject }) {
    return (
        <Link
            to={`/subjects/${subject.id}`}
            className="focus-ring group relative flex flex-col overflow-hidden rounded-2xl border border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-500/50 hover:shadow-card-hover"
        >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/25 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-105">
                        <BookMarked className="h-7 w-7" />
                    </span>
                    {subject.views_count > 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-ink-light/5 dark:bg-ink-dark/10 px-2.5 py-1 font-mono text-xs font-bold text-muted">
                            <Eye className="h-3.5 w-3.5" />
                            {subject.views_count}
                        </span>
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {subject.name}
                    </h3>
                    {subject.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                            {subject.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-1.5 border-t border-ink-light/8 dark:border-ink-dark/8 pt-4 text-sm font-bold text-primary-600 dark:text-primary-400">
                    عرض المادة
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
