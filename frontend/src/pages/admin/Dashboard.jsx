import { Link } from 'react-router-dom';
import { FileCheck2, Clock3, BookOpen, GraduationCap, ArrowLeft } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import StorageCard from '../../components/admin/StorageCard';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { formatRelativeDate } from '../../utils/formatDate';

export default function Dashboard() {
    const { data, loading, error, refetch } = useFetch(() => adminService.getDashboard(), []);

    if (loading) return <Loader />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;

    const { stats, pendingFilesCount, pendingFiles, recentFiles, mostViewedSubjects } = data;

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-display text-2xl font-bold">نظرة عامة</h1>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatsCard label="ملفات معتمدة" value={stats.total_files} icon={FileCheck2} tone="success" />
                <StatsCard label="بانتظار المراجعة" value={pendingFilesCount} icon={Clock3} tone="accent" />
                <StatsCard label="إجمالي المواد" value={stats.total_subjects} icon={BookOpen} tone="primary" />
                <StatsCard label="السنوات الدراسية" value={stats.total_years} icon={GraduationCap} tone="primary" />
            </div>

            <StorageCard usedKb={stats.total_storage_kb} />

            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold">أحدث طلبات المراجعة</h2>
                    <Link to="/admin/pending" className="flex items-center gap-1 text-sm font-bold text-primary-500 hover:underline">
                        عرض الكل
                        <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {pendingFiles.length === 0 ? (
                    <Card className="p-6 text-center text-sm text-muted">لا توجد طلبات معلّقة حاليًا 🎉</Card>
                ) : (
                    <Card className="divide-y divide-ink-light/8 dark:divide-ink-dark/8">
                        {pendingFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-4 text-sm">
                                <div>
                                    <p className="font-bold">{file.title}</p>
                                    <p className="text-xs text-muted">{file.subject_name} · {file.category_name}</p>
                                </div>
                                <span className="font-mono text-xs text-muted">{formatRelativeDate(file.created_at)}</span>
                            </div>
                        ))}
                    </Card>
                )}
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <section>
                    <h2 className="mb-3 font-display text-lg font-bold">أكثر المواد مشاهدة</h2>
                    <Card className="divide-y divide-ink-light/8 dark:divide-ink-dark/8">
                        {mostViewedSubjects.map((subject) => (
                            <div key={subject.id} className="flex items-center justify-between p-4 text-sm">
                                <span className="font-bold">{subject.name}</span>
                                <span className="font-mono text-xs text-muted">{subject.views_count} مشاهدة</span>
                            </div>
                        ))}
                    </Card>
                </section>

                <section>
                    <h2 className="mb-3 font-display text-lg font-bold">آخر الملفات المعتمدة</h2>
                    <Card className="divide-y divide-ink-light/8 dark:divide-ink-dark/8">
                        {recentFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-4 text-sm">
                                <span className="font-bold">{file.title}</span>
                                <span className="font-mono text-xs text-muted">{formatRelativeDate(file.created_at)}</span>
                            </div>
                        ))}
                    </Card>
                </section>
            </div>
        </div>
    );
}
