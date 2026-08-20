import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { structureService } from '../../services/structureService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

export default function ManageStructure() {
    const [selectedUniversityId, setSelectedUniversityId] = useState(null);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);
    const [selectedYearId, setSelectedYearId] = useState(null);

    // جلب الجامعات
    const { data: universities, loading: loadingUniversities, refetch: refetchUniversities } = useFetch(
        () => structureService.getUniversities(),
        []
    );

    // جلب الكليات
    const { data: colleges, loading: loadingColleges, refetch: refetchColleges } = useFetch(
        () => (selectedUniversityId ? structureService.getColleges(selectedUniversityId) : Promise.resolve([])),
        [selectedUniversityId]
    );

    // جلب السنوات
    const { data: years, loading: loadingYears, refetch: refetchYears } = useFetch(
        () => (selectedCollegeId ? structureService.getAcademicYears(selectedCollegeId) : Promise.resolve([])),
        [selectedCollegeId]
    );

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-display text-2xl font-bold">إدارة الهيكل الأكاديمي</h1>

            {/* إدارة الجامعات */}
            <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">الجامعات</h2>
                </div>
                {loadingUniversities ? (
                    <Loader />
                ) : universities && universities.length > 0 ? (
                    <div className="space-y-2">
                        {universities.map((uni) => (
                            <div
                                key={uni.id}
                                onClick={() => {
                                    setSelectedUniversityId(uni.id);
                                    setSelectedCollegeId(null);
                                    setSelectedYearId(null);
                                }}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedUniversityId === uni.id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-ink-light/5 dark:bg-ink-dark/5 hover:bg-ink-light/10 dark:hover:bg-ink-dark/10'
                                }`}
                            >
                                {uni.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState title="لا توجد جامعات" />
                )}
                {selectedUniversityId && <AddUniversityForm onAdded={refetchUniversities} />}
            </Card>

            {/* إدارة الكليات */}
            {selectedUniversityId && (
                <Card className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg">الكليات</h2>
                    </div>
                    {loadingColleges ? (
                        <Loader />
                    ) : colleges && colleges.length > 0 ? (
                        <div className="space-y-2">
                            {colleges.map((college) => (
                                <div
                                    key={college.id}
                                    onClick={() => {
                                        setSelectedCollegeId(college.id);
                                        setSelectedYearId(null);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                        selectedCollegeId === college.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-ink-light/5 dark:bg-ink-dark/5 hover:bg-ink-light/10 dark:hover:bg-ink-dark/10'
                                    }`}
                                >
                                    {college.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="لا توجد كليات" />
                    )}
                    <AddCollegeForm universityId={selectedUniversityId} onAdded={refetchColleges} />
                </Card>
            )}

            {/* إدارة السنوات */}
            {selectedCollegeId && (
                <Card className="p-5">
                    <h2 className="font-bold text-lg mb-4">السنوات الدراسية</h2>
                    {loadingYears ? (
                        <Loader />
                    ) : years && years.length > 0 ? (
                        <div className="space-y-3">
                            {years.map((year) => (
                                <YearCard
                                    key={year.id}
                                    year={year}
                                    isSelected={selectedYearId === year.id}
                                    onSelect={() => setSelectedYearId(year.id)}
                                    onUpdated={refetchYears}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="لا توجد سنوات دراسية" />
                    )}
                    <AddYearForm collegeId={selectedCollegeId} existingCount={years?.length || 0} onAdded={refetchYears} />
                </Card>
            )}
        </div>
    );
}

function AddUniversityForm({ onAdded }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createUniversity({ name });
            setName('');
            onAdded();
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
                required
                className="input-field"
                placeholder="اسم جامعة جديدة"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={saving}>
                <Plus className="h-4 w-4" />
                إضافة
            </Button>
        </form>
    );
}

function AddCollegeForm({ universityId, onAdded }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createCollege({ universityId, name });
            setName('');
            onAdded();
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
                required
                className="input-field"
                placeholder="اسم كلية جديدة"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={saving}>
                <Plus className="h-4 w-4" />
                إضافة
            </Button>
        </form>
    );
}

function AddYearForm({ collegeId, existingCount, onAdded }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createAcademicYear({
                collegeId,
                name,
                orderIndex: existingCount + 1,
            });
            setName('');
            onAdded();
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
                required
                className="input-field"
                placeholder="مثال: الفرقة الأولى"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" disabled={saving}>
                <Plus className="h-4 w-4" />
                إضافة سنة
            </Button>
        </form>
    );
}

function YearCard({ year, isSelected, onSelect, onUpdated }) {
    const { data: semesters, refetch } = useFetch(() => structureService.getSemesters(year.id), [year.id]);
    const [semesterName, setSemesterName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleAddSemester = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createSemester({
                academicYearId: year.id,
                name: semesterName,
                orderIndex: (semesters?.length || 0) + 1,
            });
            setSemesterName('');
            refetch();
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card className={`p-5 cursor-pointer transition-all ${isSelected ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}`} onClick={onSelect}>
            <h3 className="mb-3 font-bold">{year.name}</h3>

            <div className="mb-3 flex flex-wrap gap-2">
                {semesters?.map((s) => (
                    <span key={s.id} className="rounded-full bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-xs font-bold text-primary-600">
                        {s.name}
                    </span>
                ))}
                {semesters?.length === 0 && <span className="text-xs text-muted">لا توجد ترمات</span>}
            </div>

            <form onSubmit={handleAddSemester} className="flex gap-2">
                <input
                    required
                    className="input-field text-sm"
                    placeholder="مثال: الترم الأول"
                    value={semesterName}
                    onChange={(e) => setSemesterName(e.target.value)}
                />
                <Button type="submit" variant="outline" disabled={saving}>
                    <Plus className="h-4 w-4" />
                    إضافة ترم
                </Button>
            </form>
        </Card>
    );
}
