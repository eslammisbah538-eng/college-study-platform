import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-ink-light/15 dark:border-ink-dark/15 py-16 text-center">
            <Icon className="h-10 w-10 text-muted" strokeWidth={1.5} />
            <h3 className="font-display font-bold text-lg">{title}</h3>
            {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
