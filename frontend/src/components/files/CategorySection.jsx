import FileCard from './FileCard';

/**
 * بيجمع الملفات حسب التصنيف ويعرض كل تصنيف في قسم منفصل
 */
export default function CategorySection({ files }) {
    const grouped = files.reduce((acc, file) => {
        const key = file.category_name || 'أخرى';
        if (!acc[key]) acc[key] = [];
        acc[key].push(file);
        return acc;
    }, {});

    return (
        <div className="flex flex-col gap-8">
            {Object.entries(grouped).map(([categoryName, categoryFiles]) => (
                <section key={categoryName}>
                    <h3 className="mb-3 font-display font-bold text-lg">{categoryName}</h3>
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
