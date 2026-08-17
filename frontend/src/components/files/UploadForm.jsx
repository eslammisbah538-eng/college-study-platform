import { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import CategoryIcon from '../files/CategoryIcon';
import StructurePicker from '../admin/StructurePicker';
import { useFetch } from '../../hooks/useFetch';
import { fileService } from '../../services/fileService';
import { uploadService } from '../../services/uploadService';
import { subjectService } from '../../services/subjectService';
import { useEffect } from 'react';

const FILE_TYPES = [
    { value: 'pdf', label: 'PDF' },
    { value: 'youtube_link', label: 'رابط يوتيوب' },
    { value: 'image', label: 'صورة' },
    { value: 'code', label: 'كود' },
];

export default function UploadForm({ subjectId }) {
    const { data: categories } = useFetch(() => fileService.getCategories(), []);

    const [semesterId, setSemesterId] = useState(null);
    const [subjects, setSubjects] = useState([]);

    const [form, setForm] = useState({
        subjectId: subjectId || '',
        categoryId: '',
        title: '',
        description: '',
        fileType: 'pdf',
        externalUrl: '',
        uploadedByName: '',
    });
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const needsLink = form.fileType === 'youtube_link';

    useEffect(() => {
        if (!semesterId) {
            setSubjects([]);
            return;
        }
        subjectService.getBySemester(semesterId).then(setSubjects);
    }, [semesterId]);

    const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await uploadService.submitFile(form, needsLink ? null : file);
            setSuccess(true);
        } catch (err) {
            setError(err?.response?.data?.message || 'حدث خطأ أثناء رفع الملف، حاول مرة أخرى');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center gap-3 rounded-card bg-success/5 border border-success/20 py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-success" />
                <h3 className="font-display font-bold text-lg">تم استلام ملفك بنجاح</h3>
                <p className="max-w-sm text-sm text-muted">
                    الملف دلوقتي قيد المراجعة من الأدمن، وهيظهر في الموقع بمجرد الموافقة عليه.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!subjectId && (
                <>
                    <Field label="اختر الفرقة والترم">
                        <StructurePicker onSemesterSelect={setSemesterId} />
                    </Field>

                    <Field label="المادة">
                        <select
                            required
                            value={form.subjectId}
                            onChange={handleChange('subjectId')}
                            disabled={!semesterId}
                            className="input-field disabled:opacity-50"
                        >
                            <option value="">اختر المادة...</option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </Field>
                </>
            )}

            <Field label="عنوان الملف">
                <input
                    required
                    minLength={3}
                    value={form.title}
                    onChange={handleChange('title')}
                    className="input-field"
                    placeholder="مثال: ملخص الفصل الثالث - نظم التشغيل"
                />
            </Field>

            <Field label="التصنيف">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {categories?.map((cat) => (
                        <label
                            key={cat.id}
                            className={`focus-ring flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-colors ${
                                Number(form.categoryId) === cat.id
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                    : 'border-ink-light/10 dark:border-ink-dark/10 hover:bg-ink-light/5 dark:hover:bg-ink-dark/5'
                            }`}
                        >
                            <input
                                type="radio"
                                name="categoryId"
                                value={cat.id}
                                checked={Number(form.categoryId) === cat.id}
                                onChange={handleChange('categoryId')}
                                className="sr-only"
                                required
                            />
                            <CategoryIcon icon={cat.icon} className="h-5 w-5" />
                            {cat.name}
                        </label>
                    ))}
                </div>
            </Field>

            <Field label="نوع الملف">
                <select value={form.fileType} onChange={handleChange('fileType')} className="input-field">
                    {FILE_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>
            </Field>

            {needsLink ? (
                <Field label="رابط اليوتيوب">
                    <input
                        required
                        type="url"
                        value={form.externalUrl}
                        onChange={handleChange('externalUrl')}
                        className="input-field"
                        placeholder="https://youtube.com/watch?v=..."
                    />
                </Field>
            ) : (
                <Field label="الملف">
                    <label className="focus-ring flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-ink-light/15 dark:border-ink-dark/15 p-6 text-center hover:border-primary-500 transition-colors">
                        <UploadCloud className="h-8 w-8 text-muted" />
                        <span className="text-sm text-muted">
                            {file ? file.name : 'اضغط لاختيار ملف (PDF، صورة)'}
                        </span>
                        <input
                            type="file"
                            className="sr-only"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required={!needsLink}
                        />
                    </label>
                </Field>
            )}

            <Field label="وصف مختصر (اختياري)">
                <textarea
                    value={form.description}
                    onChange={handleChange('description')}
                    className="input-field"
                    rows={3}
                    placeholder="أي تفاصيل إضافية عن الملف..."
                />
            </Field>

            <Field label="اسمك (اختياري)">
                <input
                    value={form.uploadedByName}
                    onChange={handleChange('uploadedByName')}
                    className="input-field"
                    placeholder="هيظهر كـ 'رفعه: ...'"
                />
            </Field>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'جاري الرفع...' : 'رفع الملف'}
            </Button>
        </form>
    );
}

function Field({ label, children }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold">{label}</span>
            {children}
        </label>
    );
}
