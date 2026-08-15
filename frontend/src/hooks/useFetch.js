import { useEffect, useState, useCallback } from 'react';

/**
 * Hook عام لجلب بيانات من أي دالة async (خدمة API)
 * بيرجع { data, loading, error, refetch }
 */
export function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err?.response?.data?.message || 'حدث خطأ أثناء تحميل البيانات');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        load();
    }, [load]);

    return { data, loading, error, refetch: load };
}
