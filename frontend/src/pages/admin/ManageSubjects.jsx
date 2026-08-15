import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { subjectService } from '../../services/subjectService';
import StructurePicker from '../../components/admin/StructurePicker';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const emptyForm = { name: '', slug: '', description: '' };

export default function ManageSubjects() {
    const [semesterId, setSemesterId] = useState(null);
    const [editingId, setEditingId] = useState(null); // null = مش بنعدل، 'new' = فورم إضافة
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const { data: subjects, loading, refetch } = useFetch(
        () => (semesterId ? subjectService.getBySemester(semesterId) : Promise.resolve(null)),
        [semesterId]
    );

    const startCreate = () => {
        setForm(emptyForm);
        setEditingId('new');
    };

    const startEdit = (subject) => {
        setForm({ name: subject.name, slug: subject.slug, description: subject.description || '' });
        setEditingId(subject.id);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            if (editingId === 'new') {
                await subjectService.create({ semesterId, ...form });
            } else {
                await subjectService.update(editingId, form);
            }
            cancelEdit();
            refetch();
        } catch (err) {
            setError(err?.response?.data?.message || 'حدث خطأ أثناء الحفظ');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('متأكد إنك عايز تحذف المادة دي؟ هيتحذف معاها كل الملفات التابعة ليها.')) return;
        await subjectService.remove(id);
        refetch();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl font-bold">إدارة المواد الدراسية</h1>
                {semesterId && editingId === null && (
                    <Button onClick={startCreate}>
                        <Plus className="h-4 w-4" />
                        إضافة مادة
                    </Button>
                )}
            </div>

            <Card className="p-5">
                <StructurePicker onSemesterSelect={setSemesterId} />
            </Card>

            {!semesterId && (
                <EmptyState title="اختر ترمًا أولاً" description="حدد الجامعة والكلية والسنة والترم لعرض المواد الخاصة به." />
            )}

            {semesterId && editingId && (
                <Card className="p-5">
                    <form onSubmit={handleSave} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold">{editingId === 'new' ? 'إضافة مادة جديدة' : 'تعديل المادة'}</h3>
                            <button type="button" onClick={cancelEdit} className="focus-ring text-muted hover:text-ink-light dark:hover:text-ink-dark">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-bold">اسم المادة</span>
                                <input
                                    required
                                    className="input-field"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-bold">الـ Slug (بالإنجليزي)</span>
                                <input
                                    required
                                    pattern="[a-z0-9-]+"
                                    placeholder="programming-1"
                                    className="input-field"
                                    value={form.slug}
                                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-bold">وصف مختصر</span>
                            <textarea
                                rows={2}
                                className="input-field"
                                value={form.description}
                                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                            />
                        </label>

                        {error && <p className="text-sm text-danger">{error}</p>}

                        <Button type="submit" disabled={saving} className="self-start">
                            {saving ? 'جاري الحفظ...' : 'حفظ'}
                        </Button>
                    </form>
                </Card>
            )}

            {loading && <Loader />}

            {subjects && subjects.length === 0 && !editingId && (
                <EmptyState title="لا توجد مواد في هذا الترم" description="ابدأ بإضافة أول مادة." />
            )}

            {subjects && subjects.length > 0 && (
                <Card className="divide-y divide-ink-light/8 dark:divide-ink-dark/8">
                    {subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center justify-between p-4">
                            <div>
                                <p className="font-bold">{subject.name}</p>
                                <p className="font-mono text-xs text-muted">/{subject.slug}</p>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => startEdit(subject)} className="focus-ring rounded-lg p-2 text-muted hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500">
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(subject.id)} className="focus-ring rounded-lg p-2 text-muted hover:bg-danger/10 hover:text-danger">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
}
