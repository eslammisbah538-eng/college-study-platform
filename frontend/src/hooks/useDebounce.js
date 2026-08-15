import { useEffect, useState } from 'react';

/**
 * بيأخر تحديث القيمة لحد ما المستخدم يوقف عن الكتابة
 * مستخدم في البحث الفوري عشان منبعتش request مع كل حرف
 */
export function useDebounce(value, delayMs = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debouncedValue;
}
