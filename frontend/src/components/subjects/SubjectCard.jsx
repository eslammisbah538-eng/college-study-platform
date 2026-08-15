import { Link } from 'react-router-dom';
import { BookMarked, Eye } from 'lucide-react';

export default function SubjectCard({ subject }) {
    return (
        <Link
            to={`/subjects/${subject.id}`}
            className="folder-tab-card focus-ring group block bg-surface-light dark:bg-surface-dark shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
        >
            <div className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                        <BookMarked className="h-5 w-5" />
                    </span>
                    {subject.views_count > 0 && (
                        <span className="flex items-center gap-1 font-mono text-xs text-muted">
                            <Eye className="h-3.5 w-3.5" />
                            {subject.views_count}
                        </span>
                    )}
                </div>

                <div>
                    <h3 className="font-display font-bold leading-snug group-hover:text-primary-500 transition-colors">
                        {subject.name}
                    </h3>
                    {subject.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{subject.description}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
