import { useEffect, useState } from 'react';
import { structureService } from '../../services/structureService';

/**
 * قوائم منسدلة متتالية: جامعة → كلية → سنة → ترم
 * بينادي onSemesterSelect(semesterId) لما يوصل لآخر مستوى
 */
export default function StructurePicker({ onSemesterSelect }) {
    const [universities, setUniversities] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [years, setYears] = useState([]);
    const [semesters, setSemesters] = useState([]);

    const [selected, setSelected] = useState({ university: '', college: '', year: '', semester: '' });

    useEffect(() => {
        structureService.getUniversities().then(setUniversities);
    }, []);

    useEffect(() => {
        if (!selected.university) return setColleges([]);
        structureService.getColleges(selected.university).then(setColleges);
    }, [selected.university]);

    useEffect(() => {
        if (!selected.college) return setYears([]);
        structureService.getAcademicYears(selected.college).then(setYears);
    }, [selected.college]);

    useEffect(() => {
        if (!selected.year) return setSemesters([]);
        structureService.getSemesters(selected.year).then(setSemesters);
    }, [selected.year]);

    useEffect(() => {
        onSemesterSelect?.(selected.semester || null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected.semester]);

    const handle = (level) => (e) => {
        const value = e.target.value;
        setSelected((prev) => {
            const next = { ...prev, [level]: value };
            // إعادة تصفير كل المستويات الأصغر لما نغيّر مستوى أعلى
            if (level === 'university') return { ...next, college: '', year: '', semester: '' };
            if (level === 'college') return { ...next, year: '', semester: '' };
            if (level === 'year') return { ...next, semester: '' };
            return next;
        });
    };

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Select label="الجامعة" value={selected.university} onChange={handle('university')} options={universities} />
            <Select label="الكلية" value={selected.college} onChange={handle('college')} options={colleges} disabled={!selected.university} />
            <Select label="السنة" value={selected.year} onChange={handle('year')} options={years} disabled={!selected.college} />
            <Select label="الترم" value={selected.semester} onChange={handle('semester')} options={semesters} disabled={!selected.year} />
        </div>
    );
}

function Select({ label, value, onChange, options, disabled }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-muted">{label}</span>
            <select value={value} onChange={onChange} disabled={disabled} className="input-field disabled:opacity-50">
                <option value="">اختر...</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
            </select>
        </label>
    );
}
