export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-light/10 dark:border-ink-dark/10 py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted">
        <p>
          Developed and Designed by{" "}
          <a href="https://wa.me/201103023916" target="_blank" rel="noopener noreferrer" className="font-bold text-primary-600 hover:underline">
            Islam Misbah
          </a>
        </p>
        <p className="mt-1 text-xs opacity-70">
          Copyright {new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </footer>
  );
}
