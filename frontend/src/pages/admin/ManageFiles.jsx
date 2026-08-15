import { useState } from 'react';
import { Pencil, Trash2, X, ExternalLink } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { fileService } from '../../services/fileService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

export default function ManageFiles() {
    const { data: files, loading, refetch } = useFetch(() => fileService.getRecent(50), []);
    const [editingFile, setEditingFile] = useState(null);
    const [form, setForm] = useState({ title: '', description: '' });
    const [saving, setSaving] = useState(false);

    const startEdit = (file) => {
        setEditingFile(file);
        setForm({ title: file.title, description: file.description || '' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fileService.update(editingFile.id, form);
            setEditingFile(null);
            refetch();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('متأكد إنك عايز تحذف الملف ده؟')) return;
        await fileService.remove(id);
        refetch();
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-display text-2xl font-bold">إدارة الملفات المعتمدة</h1>
            <p className="-mt-4 text-sm text-muted">آخر 50 ملف معتمد. للبحث عن ملف محدد، استخدم البحث العام في الموقع.</p>

            {editingFile && (
                <Card className="p-5">
                    <form onSubmit={handleSave} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold">تعديل: {editingFile.title}</h3>
                            <button type="button" onClick={() => setEditingFile(null)} className="focus-ring text-muted">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-bold">العنوان</span>
                            <input
                                required
                                className="input-field"
                                value={form.title}
                                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-sm font-bold">الوصف</span>
                            <textarea
                                rows={2}
                                className="input-field"
                                value={form.description}
                                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                            />
                        </label>
                        <Button type="submit" disabled={saving} className="self-start">
                            {saving ? 'جاري الحفظ...' : 'حفظ التعديل'}
                        </Button>
                    </form>
                </Card>
            )}

            {loading && <Loader />}

            {files && files.length === 0 && (
                <EmptyState title="لا توجد ملفات معتمدة بعد" />
            )}

            {files && files.length > 0 && (
                <Card className="divide-y divide-ink-light/8 dark:divide-ink-dark/8">
                    {files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4">
                            <a
                                href={file.file_url || file.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="focus-ring flex items-center gap-1.5 font-bold hover:text-primary-500"
                            >
                                {file.title}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <div className="flex gap-1">
                                <button onClick={() => startEdit(file)} className="focus-ring rounded-lg p-2 text-muted hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500">
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(file.id)} className="focus-ring rounded-lg p-2 text-muted hover:bg-danger/10 hover:text-danger">
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
