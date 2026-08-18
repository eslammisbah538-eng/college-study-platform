import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { structureService } from '../services/structureService';
import { subjectService } from '../services/subjectService';
import { fileService } from '../services/fileService';
import SubjectCard from '../components/subjects/SubjectCard';
import FileCard from '../components/files/FileCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';

export default function Home() {
    const { data: universities } = useFetch(() => structureService.getUniversities(), []);
    const {
        data: mostViewed,
        loading: loadingViewed,
        error: errorViewed,
    } = useFetch(() => subjectService.getMostViewed(6), []);
    const { data: recentFiles, loading: loadingRecent } = useFetch(() => fileService.getRecent(6), []);

    return (
        <div className="flex flex-col gap-14">
                      {/* Hero */}
            <section className="flex flex-col items-center gap-4 rounded-card bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/20 px-6 py-14 text-center">
                <h1 className="max-w-2xl font-display text-3xl font-black leading-tight sm:text-4xl">
                    كل ما تحتاجه في مذاكرتك في مكان واحد
                </h1>
                <p className="max-w-lg text-muted">
                    اختر فرقتك وترمك ومادتك، ولاقِ كل حاجة محتاجها في صفحة واحدة.
                </p>
            </section>

            {/* السنوات الدراسية */}
            {universities?.[0] && (
                <YearsBrowser universityId={universities[0].id} />
            )}

            {/* أكثر المواد استخدامًا */}
            <section>
                <SectionHeader icon={TrendingUp} title="أكثر المواد استخدامًا" />
                {loadingViewed && <Loader />}
                {errorViewed && <ErrorState message={errorViewed} />}
                {mostViewed && mostViewed.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {mostViewed.map((subject) => (
                            <SubjectCard key={subject.id} subject={subject} />
                        ))}
                    </div>
                )}
            </section>

            {/* آخر الملفات المضافة */}
            <section>
                <SectionHeader icon={Clock} title="آخر الملفات المضافة" />
                {loadingRecent && <Loader />}
                {recentFiles && recentFiles.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {recentFiles.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="mb-4 flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary-500" />
            <h2 className="font-display text-xl font-bold">{title}</h2>
        </div>
    );
}

/**
 * يعرض كليات الجامعة الأولى مباشرة كنقطة دخول سريعة للسنوات الدراسية
 */
function YearsBrowser({ universityId }) {
    const { data: colleges } = useFetch(() => structureService.getColleges(universityId), [universityId]);
    const firstCollege = colleges?.[0];

    const { data: years, loading } = useFetch(
        () => (firstCollege ? structureService.getAcademicYears(firstCollege.id) : Promise.resolve([])),
        [firstCollege?.id]
    );

    if (loading || !years?.length) return null;

    return (
        <section>
            <SectionHeader icon={ArrowLeft} title="تصفح حسب الفرقة الدراسية" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {years.map((year) => (
                    <Link key={year.id} to={`/years/${year.id}`}>
                        <Button variant="outline" className="w-full justify-between py-4">
                            {year.name}
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                ))}
            </div>
        </section>
    );
}
