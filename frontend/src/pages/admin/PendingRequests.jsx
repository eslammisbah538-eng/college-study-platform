import { useState } from 'react';
import { Inbox } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';
import PendingFileRow from '../../components/admin/PendingFileRow';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';

export default function PendingRequests() {
    const { data, loading, error, refetch } = useFetch(() => adminService.getPendingFiles(), []);
    const [dismissedIds, setDismissedIds] = useState([]);

    const handleReviewed = (fileId) => {
        // إخفاء الصف فورًا من غير ما نستنى إعادة تحميل الصفحة كلها
        setDismissedIds((prev) => [...prev, fileId]);
    };

    const visibleFiles = data?.filter((f) => !dismissedIds.includes(f.id));

    return (
        <div>
            <h1 className="mb-6 font-display text-2xl font-bold">طلبات المراجعة</h1>

            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}

            {visibleFiles && visibleFiles.length === 0 && (
                <EmptyState icon={Inbox} title="مفيش طلبات معلّقة" description="كل الملفات تمت مراجعتها 🎉" />
            )}

            {visibleFiles && visibleFiles.length > 0 && (
                <div className="flex flex-col gap-3">
                    {visibleFiles.map((file) => (
                        <PendingFileRow key={file.id} file={file} onReviewed={handleReviewed} />
                    ))}
                </div>
            )}
        </div>
    );
}
