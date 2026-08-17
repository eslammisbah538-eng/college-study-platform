import { Link } from 'react-router-dom';
import { GraduationCap, Upload } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import Button from '../common/Button';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-ink-light/10 dark:border-ink-dark/10 bg-paper-light/90 dark:bg-paper-dark/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
                <Link to="/" className="flex shrink-0 items-center gap-2 font-display font-black">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white">
                        <GraduationCap className="h-5 w-5" />
                    </span>
                    <span className="hidden sm:inline text-lg">منصة الطالب</span>
                </Link>
                <SearchBar className="hidden flex-1 md:block" />
                <div className="mr-auto flex items-center gap-2">
                    <Link to="/upload">
                        <Button variant="accent" className="inline-flex">
                            <Upload className="h-4 w-4" />
                            <span className="hidden xs:inline">ارفع ملف</span>
                        </Button>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
            <div className="border-t border-ink-light/5 dark:border-ink-dark/5 px-4 py-2 md:hidden">
                <SearchBar />
            </div>
        </header>
    );
}
