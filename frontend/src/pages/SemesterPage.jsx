import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { subjectService } from '../services/subjectService';
import Breadcrumb from '../components/layout/Breadcrumb';
import SubjectCard from '../components/subjects/SubjectCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

export default function SemesterPage() {
    const { semesterId } = useParams();
    const { data: subjects, loading, error, refetch } = useFetch(
        () => subjectService.getBySemester(semesterId),
        [semesterId]
    );

    return (
        <div>
            <Breadcrumb items={[{ label: 'المواد الدراسية' }]} />
            <h1 className="mb-6 font-display text-2xl font-bold">مواد الترم</h1>

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {subjects && subjects.length === 0 && (
                <EmptyState title="لا توجد مواد مضافة بعد" description="سيتم إضافة المواد قريبًا." />
            )}

            {subjects && subjects.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject) => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </div>
            )}
        </div>
    );
}
