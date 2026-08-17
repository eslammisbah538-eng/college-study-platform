import { Link } from 'react-router-dom';
import { BookMarked, Eye } from 'lucide-react';

export default function SubjectCard({ subject }) {
    return (
        <Link
            to={`/subjects/${subject.id}`}
            className="folder-tab-card focus-ring group block bg-surface-light dark:bg-surface-dark shadow-card border border-ink-light/8 dark:border-ink-dark/8 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-500/40"
        >
            <div className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                        <BookMarked className="h-7 w-7" />
                    </span>
                    {subject.views_count > 0 && (
                        <span className="flex items-center gap-1 font-mono text-sm text-muted">
                            <Eye className="h-4 w-4" />
                            {subject.views_count}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="font-display font-bold text-lg leading-snug group-hover:text-primary-500 transition-colors">
                        {subject.name}
                    </h3>
                    {subject.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted">{subject.description}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
