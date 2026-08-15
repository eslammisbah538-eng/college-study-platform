import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-ink-light/10 dark:border-ink-dark/10 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-muted sm:px-6">
                <p>منصة الطالب — كل مادتك في مكان واحد</p>
                <p>
                    عايز تضيف ملف مش موجود؟{' '}
                    <Link to="/upload" className="font-bold text-primary-500 hover:underline">
                        ارفعه دلوقتي
                    </Link>
                </p>
            </div>
        </footer>
    );
}
