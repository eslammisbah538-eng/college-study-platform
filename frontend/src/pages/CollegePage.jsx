import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { structureService } from '../services/structureService';
import Breadcrumb from '../components/layout/Breadcrumb';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Card from '../components/common/Card';

export default function CollegePage() {
    const { collegeId } = useParams();
    const { data: years, loading, error, refetch } = useFetch(
        () => structureService.getAcademicYears(collegeId),
        [collegeId]
    );

    return (
        <div>
            <Breadcrumb items={[{ label: 'الفرق الدراسية' }]} />
            <h1 className="mb-6 font-display text-2xl font-bold">اختر فرقتك الدراسية</h1>

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {years && years.length === 0 && (
                <EmptyState title="لا توجد فرق مضافة بعد" description="سيتم إضافة الفرق الدراسية قريبًا." />
            )}

            {years && years.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {years.map((year) => (
                        <Link key={year.id} to={`/years/${year.id}`}>
                            <Card hoverable className="flex items-center gap-4 p-5">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                                    <GraduationCap className="h-5 w-5" />
                                </span>
                                <span className="flex-1 font-bold">{year.name}</span>
                                <ArrowLeft className="h-4 w-4 text-muted" />
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
