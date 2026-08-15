import { Download, ExternalLink } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { formatFileSize, formatRelativeDate } from '../../utils/formatDate';

export default function FileCard({ file }) {
    const link = file.file_url || file.external_url;
    const isExternal = !file.file_url && !!file.external_url;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring group flex items-center gap-3 rounded-card border border-ink-light/8 dark:border-ink-dark/8 bg-surface-light dark:bg-surface-dark p-4 transition-all hover:shadow-card-hover hover:-translate-y-0.5"
        >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-dark">
                <CategoryIcon icon={file.category_slug} />
            </span>

            <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold text-sm group-hover:text-primary-500 transition-colors">
                    {file.title}
                </h4>
                <p className="mt-0.5 font-mono text-xs text-muted">
                    {formatFileSize(file.file_size_kb)}
                    {file.file_size_kb && ' · '}
                    {formatRelativeDate(file.created_at)}
                </p>
            </div>

            <span className="shrink-0 text-muted group-hover:text-primary-500 transition-colors">
                {isExternal ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            </span>
        </a>
    );
}
