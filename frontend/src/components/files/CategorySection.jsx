import FileCard from './FileCard';
import CategoryIcon from './CategoryIcon';

/**
 * بيجمع الملفات حسب التصنيف ويعرض كل تصنيف في قسم منفصل
 */
export default function CategorySection({ files }) {
    const grouped = files.reduce((acc, file) => {
        const key = file.category_name || 'أخرى';
        if (!acc[key]) acc[key] = { files: [], slug: file.category_slug };
        acc[key].files.push(file);
        return acc;
    }, {});

    return (
        <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([categoryName, { files: categoryFiles, slug }]) => (
                <section key={categoryName}>
                    <div className="mb-4 flex items-center gap-3 border-b border-ink-light/10 dark:border-ink-dark/10 pb-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                            <CategoryIcon icon={slug} className="h-4.5 w-4.5" />
                        </span>
                        <h3 className="font-display text-lg font-bold">{categoryName}</h3>
                        <span className="rounded-full bg-ink-light/5 dark:bg-ink-dark/10 px-2.5 py-0.5 font-mono text-xs font-bold text-muted">
                            {categoryFiles.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {categoryFiles.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
