import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message = 'حدث خطأ أثناء تحميل البيانات', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-card bg-danger/5 border border-danger/20 py-12 text-center">
            <AlertTriangle className="h-8 w-8 text-danger" strokeWidth={1.5} />
            <p className="text-sm text-ink-light dark:text-ink-dark">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="focus-ring text-sm font-bold text-primary-500 hover:underline"
                >
                    حاول مرة أخرى
                </button>
            )}
        </div>
    );
}
