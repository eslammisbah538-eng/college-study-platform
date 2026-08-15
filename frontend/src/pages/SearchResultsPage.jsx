import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { fileService } from '../services/fileService';
import FileCard from '../components/files/FileCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

export default function SearchResultsPage() {
    const [params] = useSearchParams();
    const query = params.get('q') || '';

    const { data: results, loading, error, refetch } = useFetch(
        () => fileService.search(query),
        [query]
    );

    return (
        <div>
            <h1 className="mb-1 font-display text-2xl font-bold">نتائج البحث</h1>
            <p className="mb-6 text-muted">عن: «{query}»</p>

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {results && results.length === 0 && (
                <EmptyState
                    icon={Search}
                    title="مفيش نتائج مطابقة"
                    description="جرب كلمة بحث تانية أو تأكد من الإملاء."
                />
            )}

            {results && results.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            )}
        </div>
    );
}
