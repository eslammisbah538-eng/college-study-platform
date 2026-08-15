import { useParams, Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { subjectService } from '../services/subjectService';
import { fileService } from '../services/fileService';
import Breadcrumb from '../components/layout/Breadcrumb';
import CategorySection from '../components/files/CategorySection';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export default function SubjectPage() {
    const { id } = useParams();

    const { data: subject, loading: loadingSubject } = useFetch(
        () => subjectService.getOne(id),
        [id]
    );
    const { data: files, loading: loadingFiles, error, refetch } = useFetch(
        () => fileService.getBySubject(id),
        [id]
    );

    const loading = loadingSubject || loadingFiles;

    return (
        <div>
            <Breadcrumb items={[{ label: subject?.name || '...' }]} />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-2xl font-bold">{subject?.name}</h1>
                <Link to={`/upload?subjectId=${id}`}>
                    <Button variant="accent">
                        <Upload className="h-4 w-4" />
                        ارفع ملف لهذه المادة
                    </Button>
                </Link>
            </div>

            {subject?.description && (
                <p className="mb-8 max-w-2xl text-muted">{subject.description}</p>
            )}

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {files && files.length === 0 && (
                <EmptyState
                    title="لا توجد ملفات في هذه المادة بعد"
                    description="كن أول من يرفع محتوى لهذه المادة."
                    action={
                        <Link to={`/upload?subjectId=${id}`}>
                            <Button variant="primary">ارفع أول ملف</Button>
                        </Link>
                    }
                />
            )}

            {files && files.length > 0 && <CategorySection files={files} />}
        </div>
    );
}
