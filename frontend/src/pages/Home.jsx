import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Building2, GraduationCap } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { structureService } from '../services/structureService';
import { subjectService } from '../services/subjectService';
import { fileService } from '../services/fileService';
import SubjectCard from '../components/subjects/SubjectCard';
import FileCard from '../components/files/FileCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';

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
                    اختر كليتك وفرقتك وترمك ومادتك، ولاقِ كل حاجة محتاجها في صفحة واحدة.
                </p>
            </section>

            {/* اختيار الكلية ثم الفرقة */}
            {universities?.[0] && (
                <CollegesBrowser universityId={universities[0].id} />
            )}

            {/* أكثر المواد استخدامًا */}
            <section>
                <SectionHeader icon={TrendingUp} title="أكثر المواد استخدامًا" />
                {loadingViewed && <Loader />}
                {errorViewed && <ErrorState message={errorViewed} />}
                {mostViewed && mostViewed.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
 * قسم تصفح ثابت: يعرض الكلية دايمًا كخطوة أولى واضحة،
 * وبعد اختيارها يعرض الفرق الدراسية التابعة لها.
 */
function CollegesBrowser({ universityId }) {
    const { data: colleges, loading } = useFetch(
        () => structureService.getColleges(universityId),
        [universityId]
    );

    if (loading || !colleges?.length) return null;

    return (
        <section>
            <SectionHeader icon={Building2} title="تصفح حسب الكلية" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {colleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                ))}
            </div>
        </section>
    );
}

function CollegeCard({ college }) {
    const { data: years } = useFetch(
        () => structureService.getAcademicYears(college.id),
        [college.id]
    );

    return (
        <div className="rounded-2xl border border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark p-6 shadow-card">
            <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                    <GraduationCap className="h-6 w-6" />
                </span>
                <h3 className="font-display font-bold">{college.name}</h3>
            </div>
            {years?.length > 0 && (
                <div className="flex flex-col gap-2">
                    {years.map((year) => (
                        <Link
                            key={year.id}
                            to={`/years/${year.id}`}
                            className="focus-ring group flex items-center justify-between rounded-xl border border-ink-light/8 dark:border-ink-dark/8 px-4 py-3 text-sm font-bold transition-all hover:border-primary-500/40 hover:bg-primary-50 dark:hover:bg-primary-900/10"
                        >
                            {year.name}
                            <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-1 group-hover:text-primary-500" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
