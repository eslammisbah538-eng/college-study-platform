import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { structureService } from '../../services/structureService';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';

export default function ManageStructure() {
    const { data: universities } = useFetch(() => structureService.getUniversities(), []);
    const [collegeId, setCollegeId] = useState('');
    const { data: colleges } = useFetch(
        () => (universities?.[0] ? structureService.getColleges(universities[0].id) : Promise.resolve([])),
        [universities?.[0]?.id]
    );

    const { data: years, loading, refetch } = useFetch(
        () => (collegeId ? structureService.getAcademicYears(collegeId) : Promise.resolve(null)),
        [collegeId]
    );

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-display text-2xl font-bold">إدارة السنوات والترمات</h1>

            <Card className="p-5">
                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold">الكلية</span>
                    <select
                        className="input-field max-w-xs"
                        value={collegeId}
                        onChange={(e) => setCollegeId(e.target.value)}
                    >
                        <option value="">اختر كلية...</option>
                        {colleges?.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </label>
            </Card>

            {loading && <Loader />}

            {collegeId && years && (
                <div className="flex flex-col gap-4">
                    <AddYearForm collegeId={collegeId} existingCount={years.length} onAdded={refetch} />

                    {years.map((year) => (
                        <YearCard key={year.id} year={year} />
                    ))}
                </div>
            )}
        </div>
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
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                required
                className="input-field"
                placeholder="مثال: الفرقة الثالثة"
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

function YearCard({ year }) {
    const { data: semesters, refetch } = useFetch(() => structureService.getSemesters(year.id), [year.id]);
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleAddSemester = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await structureService.createSemester({
                academicYearId: year.id,
                name,
                orderIndex: (semesters?.length || 0) + 1,
            });
            setName('');
            refetch();
        } finally {
            setSaving(false);
        }
    };

    return (
        <Card className="p-5">
            <h3 className="mb-3 font-bold">{year.name}</h3>

            <div className="mb-3 flex flex-wrap gap-2">
                {semesters?.map((s) => (
                    <span key={s.id} className="rounded-full bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-xs font-bold text-primary-600">
                        {s.name}
                    </span>
                ))}
                {semesters?.length === 0 && <span className="text-xs text-muted">لا توجد ترمات مضافة</span>}
            </div>

            <form onSubmit={handleAddSemester} className="flex gap-2">
                <input
                    required
                    className="input-field text-sm"
                    placeholder="مثال: الترم الثاني"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" variant="outline" disabled={saving}>
                    <Plus className="h-4 w-4" />
                    إضافة ترم
                </Button>
            </form>
        </Card>
    );
}
