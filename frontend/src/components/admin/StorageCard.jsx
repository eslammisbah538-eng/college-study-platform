import { HardDrive } from 'lucide-react';
import Card from '../common/Card';

const LIMIT_MB = 1024; // 1GB حد الخطة المجانية في Supabase

export default function StorageCard({ usedKb }) {
    const usedMb = (usedKb || 0) / 1024;
    const percent = Math.min((usedMb / LIMIT_MB) * 100, 100);

    let barColor = 'bg-success';
    if (percent > 90) barColor = 'bg-danger';
    else if (percent > 70) barColor = 'bg-accent-dark';

    return (
        <Card className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                    <HardDrive className="h-5 w-5" />
                </span>
                <div>
                    <p className="font-bold text-sm">مساحة التخزين</p>
                         <p className="font-mono text-xs text-muted" dir="ltr">
                        {usedMb.toFixed(1)} MB / {LIMIT_MB} MB
                    </p>
                </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-light/10 dark:bg-ink-dark/10">
                <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            {percent > 80 && (
                <p className="text-xs font-bold text-danger">
                    تنبيه: المساحة قربت تخلص، فكر في ترقية الخطة قريبًا
                </p>
            )}
        </Card>
    );
}
