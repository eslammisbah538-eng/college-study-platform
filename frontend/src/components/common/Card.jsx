export default function Card({ children, className = '', hoverable = false, as: Tag = 'div', ...props }) {
    return (
        <Tag
            className={`rounded-card bg-surface-light dark:bg-surface-dark shadow-card border border-ink-light/5 dark:border-ink-dark/5 ${
                hoverable ? 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5' : ''
            } ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
}
