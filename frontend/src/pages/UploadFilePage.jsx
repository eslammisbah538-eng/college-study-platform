import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/layout/Breadcrumb';
import UploadForm from '../components/files/UploadForm';
import Card from '../components/common/Card';

export default function UploadFilePage() {
    const [params] = useSearchParams();
    const subjectId = params.get('subjectId');

    return (
        <div className="mx-auto max-w-xl">
            <Breadcrumb items={[{ label: 'رفع ملف' }]} />
            <h1 className="mb-2 font-display text-2xl font-bold">ارفع ملفك</h1>
            <p className="mb-6 text-muted">
                مش محتاج تعمل حساب. الملف هيظهر في الموقع بعد ما الأدمن يراجعه.
            </p>

            <Card className="p-6">
                <UploadForm subjectId={subjectId} />
            </Card>
        </div>
    );
}
