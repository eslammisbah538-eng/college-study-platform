import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = '', autoFocus = false }) {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim().length < 2) return;
        navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative ${className}`}>
            <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                autoFocus={autoFocus}
                placeholder="ابحث عن مادة، ملف، أو ملخص..."
                className="focus-ring w-full rounded-xl border border-ink-light/10 dark:border-ink-dark/10 bg-surface-light dark:bg-surface-dark py-2.5 pr-10 pl-4 text-sm placeholder:text-muted"
            />
        </form>
    );
}
