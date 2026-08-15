import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="font-mono text-6xl font-bold text-primary-500">404</span>
            <h1 className="font-display text-xl font-bold">الصفحة غير موجودة</h1>
            <p className="text-muted">يبدو إن الرابط ده مش موجود، أو اتغيّر.</p>
            <Link to="/">
                <Button variant="primary">العودة للرئيسية</Button>
            </Link>
        </div>
    );
}
