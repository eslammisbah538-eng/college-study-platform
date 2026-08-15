import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { structureService } from '../services/structureService';
import Breadcrumb from '../components/layout/Breadcrumb';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Card from '../components/common/Card';

export default function AcademicYearPage() {
    const { yearId } = useParams();
    const { data: semesters, loading, error, refetch } = useFetch(
        () => structureService.getSemesters(yearId),
        [yearId]
    );

    return (
        <div>
            <Breadcrumb items={[{ label: 'الترمات' }]} />
            <h1 className="mb-6 font-display text-2xl font-bold">اختر الترم</h1>

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {semesters && semesters.length === 0 && (
                <EmptyState title="لا توجد ترمات مضافة بعد" description="سيتم إضافة الترمات قريبًا." />
            )}

            {semesters && semesters.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {semesters.map((semester) => (
                        <Link key={semester.id} to={`/semesters/${semester.id}`}>
                            <Card hoverable className="flex items-center justify-between p-5">
                                <span className="font-bold">{semester.name}</span>
                                <ArrowLeft className="h-4 w-4 text-muted" />
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
