const VARIANTS = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    accent: 'bg-accent text-ink-light hover:bg-accent-dark',
    outline:
        'border border-ink-light/15 dark:border-ink-dark/15 text-ink-light dark:text-ink-dark hover:bg-ink-light/5 dark:hover:bg-ink-dark/5',
    danger: 'bg-danger text-white hover:opacity-90',
    ghost: 'text-ink-light dark:text-ink-dark hover:bg-ink-light/5 dark:hover:bg-ink-dark/5',
};

export default function Button({
    children,
    variant = 'primary',
    className = '',
    disabled = false,
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
