import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { structureService } from '../../services/structureService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const confirmAndDelete = async (message, deleteFn, id, onDone) => {
    if (!window.confirm(message)) return;
    await deleteFn(id);
    onDone();
};

export default function ManageStructure() {
    const [selectedUniversityId, setSelectedUniversityId] = useState(null);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
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

    // جلب الأقسام
    const { data: departments, loading: loadingDepartments, refetch: refetchDepartments } = useFetch(
        () => (selectedCollegeId ? structureService.getDepartments(selectedCollegeId) : Promise.resolve([])),
        [selectedCollegeId]
    );

    // جلب السنوات
    const { data: years, loading: loadingYears, refetch: refetchYears } = useFetch(
        () => (selectedDepartmentId ? structureService.getAcademicYears(selectedDepartmentId) : Promise.resolve([])),
        [selectedDepartmentId]
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
                                className={`flex items-center justify-between gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedUniversityId === uni.id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-ink-light/5 dark:bg-ink-dark/5 hover:bg-ink-light/10 dark:hover:bg-ink-dark/10'
                                }`}
                            >
                                <span
                                    className="flex-1"
                                    onClick={() => {
                                        setSelectedUniversityId(uni.id);
                                        setSelectedCollegeId(null);
                                        setSelectedDepartmentId(null);
                                        setSelectedYearId(null);
                                    }}
                                >
                                    {uni.name}
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        confirmAndDelete(
                                            `هل أنت متأكد من حذف "${uni.name}"؟ سيتم حذف كل الكليات والأقسام والفرق التابعة لها.`,
                                            structureService.deleteUniversity,
                                            uni.id,
                                            () => {
                                                if (selectedUniversityId === uni.id) setSelectedUniversityId(null);
                                                refetchUniversities();
                                            }
                                        );
                                    }}
                                    className="shrink-0 rounded-lg p-1.5 hover:bg-red-500/20 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
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
                                    className={`flex items-center justify-between gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                                        selectedCollegeId === college.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-ink-light/5 dark:bg-ink-dark/5 hover:bg-ink-light/10 dark:hover:bg-ink-dark/10'
                                    }`}
                                >
                                    <span
                                        className="flex-1"
                                        onClick={() => {
                                            setSelectedCollegeId(college.id);
                                            setSelectedDepartmentId(null);
                                            setSelectedYearId(null);
                                        }}
                                    >
                                        {college.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            confirmAndDelete(
                                                `هل أنت متأكد من حذف "${college.name}"؟ سيتم حذف كل الأقسام والفرق التابعة لها.`,
                                                structureService.deleteCollege,
                                                college.id,
                                                () => {
                                                    if (selectedCollegeId === college.id) setSelectedCollegeId(null);
                                                    refetchColleges();
                                                }
                                            );
                                        }}
                                        className="shrink-0 rounded-lg p-1.5 hover:bg-red-500/20 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="لا توجد كليات" />
                    )}
                    <AddCollegeForm universityId={selectedUniversityId} onAdded={refetchColleges} />
                </Card>
            )}

            {/* إدارة الأقسام */}
            {selectedCollegeId && (
                <Card className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg">الأقسام</h2>
                    </div>
                    {loadingDepartments ? (
                        <Loader />
                    ) : departments && departments.length > 0 ? (
                        <div className="space-y-2">
                            {departments.map((department) => (
                                <div
                                    key={department.id}
                                    className={`flex items-center justify-between gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                                        selectedDepartmentId === department.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-ink-light/5 dark:bg-ink-dark/5 hover:bg-ink-light/10 dark:hover:bg-ink-dark/10'
                                    }`}
                                >
                                    <span
                                        className="flex-1"
                                        onClick={() => {
                                            setSelectedDepartmentId(department.id);
                                            setSelectedYearId(null);
                                        }}
                                    >
                                        {department.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            confirmAndDelete(
                                                `هل أنت متأكد من حذف "${department.name}"؟ سيتم حذف كل الفرق والترمات التابعة له.`,
                                                structureService.deleteDepartment,
                                                department.id,
                                                () => {
                                                    if (selectedDepartmentId === department.id) setSelectedDepartmentId(null);
                                                    refetchDepartments();
                                                }
                                            );
                                        }}
                                        className="shrink-0 rounded-lg p-1.5 hover:bg-red-500/20 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="لا توجد أقسام" />
                    )}
                    <AddDepartmentForm collegeId={selectedCollegeId} onAdded={refetchDepartments} />
                </Card>
            )}
           
            {/* إدارة السنوات */}
            {selectedDepartmentId && (
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
                    <AddYearForm departmentId={selectedDepartmentId} existingCount={years?.length || 0} onAdded={refetchYears} />
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


function AddDepartmentForm({ collegeId, onAdded }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createDepartment({ collegeId, name });
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
                placeholder="اسم قسم جديد"
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

function AddYearForm({ departmentId, existingCount, onAdded }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
             await structureService.createAcademicYear({
                departmentId,
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

    const handleDeleteSemester = async (e, semester) => {
        e.stopPropagation();
        await confirmAndDelete(
            `هل أنت متأكد من حذف "${semester.name}"؟`,
            structureService.deleteSemester,
            semester.id,
            refetch
        );
    };

    return (
        <Card className={`p-5 cursor-pointer transition-all ${isSelected ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}`} onClick={onSelect}>
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">{year.name}</h3>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        confirmAndDelete(
                            `هل أنت متأكد من حذف "${year.name}"؟ سيتم حذف كل الترمات التابعة لها.`,
                            structureService.deleteAcademicYear,
                            year.id,
                            onUpdated
                        );
                    }}
                    className="shrink-0 rounded-lg p-1.5 hover:bg-red-500/20 hover:text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
                {semesters?.map((s) => (
                    <span key={s.id} className="flex items-center gap-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-xs font-bold text-primary-600">
                        {s.name}
                        <button type="button" onClick={(e) => handleDeleteSemester(e, s)} className="hover:text-red-500">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                {semesters?.length === 0 && <span className="text-xs text-muted">لا توجد ترمات</span>}
            </div>

            <form onSubmit={handleAddSemester} className="flex gap-2" onClick={(e) => e.stopPropagation()}>
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
