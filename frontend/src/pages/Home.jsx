import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Building2, GraduationCap, ArrowLeft } from 'lucide-react';
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

    const { data: colleges, loading: loadingColleges } = useFetch(
        () => (universities?.[0] ? structureService.getColleges(universities[0].id) : Promise.resolve([])),
        [universities?.[0]?.id]
    );

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

            {/* اختيار الكلية */}
            {!loadingColleges && colleges && colleges.length > 0 && (
                <section>
                    <SectionHeader icon={Building2} title="تصفح حسب الكلية" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {colleges.map((college) => (
                            <Link
                                key={college.id}
                                to={`/colleges/${college.id}`}
                                className="focus-ring group flex items-center gap-4 rounded-2xl border border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-card-hover"
                            >
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-500 transition-transform group-hover:scale-105">
                                    <GraduationCap className="h-7 w-7" />
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-display font-bold group-hover:text-primary-500 transition-colors">
                                        {college.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted">استعرض الفرق الدراسية</p>
                                </div>
                                <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-1 group-hover:text-primary-500" />
                            </Link>
                        ))}
                    </div>
                </section>
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
