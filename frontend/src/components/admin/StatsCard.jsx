import Card from '../common/Card';

export default function StatsCard({ label, value, icon: Icon, tone = 'primary' }) {
    const toneClasses = {
        primary: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
        accent: 'bg-accent/15 text-accent-dark',
        danger: 'bg-danger/10 text-danger',
        success: 'bg-success/10 text-success',
    };

    return (
        <Card className="flex items-center gap-4 p-5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
                <Icon className="h-5 w-5" />
            </span>
            <div>
                <p className="font-mono text-2xl font-bold leading-none">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
        </Card>
    );
}
