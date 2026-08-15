import { useState } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import Button from '../common/Button';
import { formatRelativeDate } from '../../utils/formatDate';
import { adminService } from '../../services/adminService';

export default function PendingFileRow({ file, onReviewed }) {
    const [loading, setLoading] = useState(null); // 'approved' | 'rejected' | null

    const handleReview = async (status) => {
        setLoading(status);
        try {
            await adminService.reviewFile(file.id, { status });
            onReviewed?.(file.id);
        } catch {
            // الخطأ هيتعامل معاه من صفحة الأب لو احتاج، هنا بنكتفي بإيقاف اللودينج
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col gap-3 rounded-card border border-ink-light/8 dark:border-ink-dark/8 bg-surface-light dark:bg-surface-dark p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
                <a
                    href={file.file_url || file.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 font-bold hover:text-primary-500"
                >
                    {file.title}
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-1 text-xs text-muted">
                    {file.subject_name} · {file.category_name} · {file.uploaded_by_name || 'مجهول'} ·{' '}
                    {formatRelativeDate(file.created_at)}
                </p>
            </div>

            <div className="flex shrink-0 gap-2">
                <Button
                    variant="danger"
                    className="flex-1 sm:flex-none"
                    disabled={loading !== null}
                    onClick={() => handleReview('rejected')}
                >
                    <X className="h-4 w-4" />
                    {loading === 'rejected' ? '...' : 'رفض'}
                </Button>
                <Button
                    variant="primary"
                    className="flex-1 sm:flex-none"
                    disabled={loading !== null}
                    onClick={() => handleReview('approved')}
                >
                    <Check className="h-4 w-4" />
                    {loading === 'approved' ? '...' : 'قبول'}
                </Button>
            </div>
        </div>
    );
}
