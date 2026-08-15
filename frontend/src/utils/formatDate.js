export function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `منذ ${diffDays} يوم`;

    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatFileSize(sizeKb) {
    if (!sizeKb) return '';
    if (sizeKb < 1024) return `${sizeKb} كيلوبايت`;
    return `${(sizeKb / 1024).toFixed(1)} ميجابايت`;
}
