import { Download, ExternalLink } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { formatFileSize, formatRelativeDate } from '../../utils/formatDate';

export default function FileCard({ file }) {
    const link = file.file_url || file.external_url;
    const isExternal = !file.file_url && !!file.external_url;
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="focus-ring group flex items-center gap-4 rounded-card border border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark p-5 transition-all hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-500/40">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-dark">
                <CategoryIcon icon={file.category_slug} className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold text-base group-hover:text-primary-500 transition-colors">
                    {file.title}
                </h4>
                <p className="mt-1 font-mono text-sm text-muted">
                    {formatFileSize(file.file_size_kb)}
                    {file.file_size_kb && ' · '}
                    {formatRelativeDate(file.created_at)}
                </p>
            </div>
            <span className="shrink-0 text-muted group-hover:text-primary-500 transition-colors">
                {isExternal ? <ExternalLink className="h-5 w-5" /> : <Download className="h-5 w-5" />}
            </span>
        </a>
    );
}
