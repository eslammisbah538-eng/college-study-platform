import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { structureService } from '../services/structureService';
import Breadcrumb from '../components/layout/Breadcrumb';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Card from '../components/common/Card';

export default function UniversityPage() {
    const { universityId } = useParams();
    const { data: colleges, loading, error, refetch } = useFetch(
        () => structureService.getColleges(universityId),
        [universityId]
    );
    return (
        <div>
            <Breadcrumb items={[{ label: 'الكليات' }]} />
            <h1 className="mb-6 font-display text-2xl font-bold">اختر كليتك</h1>
            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}
            {colleges && colleges.length === 0 && (
                <EmptyState title="لا توجد كليات مضافة بعد" description="سيتم إضافة الكليات قريبًا." />
            )}
            {colleges && colleges.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {colleges.map((college) => (
                        <Link key={college.id} to={`/colleges/${college.id}`}>
                            <Card hoverable className="flex items-center gap-4 p-5">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                                    <GraduationCap className="h-5 w-5" />
                                </span>
                                <span className="flex-1 font-bold">{college.name}</span>
                                <ArrowLeft className="h-4 w-4 text-muted" />
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
