import {
    BookOpen, FileText, Video, Youtube, NotebookPen,
    ClipboardCheck, FolderKanban, Code2, File,
} from 'lucide-react';

const ICONS = {
    'book-open': BookOpen,
    'file-text': FileText,
    video: Video,
    youtube: Youtube,
    'notebook-pen': NotebookPen,
    'clipboard-check': ClipboardCheck,
    'folder-kanban': FolderKanban,
    code: Code2,
};

export default function CategoryIcon({ icon, className = 'h-5 w-5' }) {
    const Icon = ICONS[icon] || File;
    return <Icon className={className} />;
}
