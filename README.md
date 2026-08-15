# منصة تعليمية لطلاب الكلية

منصة تجمع كل محتوى الدراسة (كتب، PDF، فيديوهات، ملخصات، امتحانات، مشاريع) في مكان واحد.

## هيكل المشروع

```
college-study-platform/
├── backend/     → Node.js + Express + PostgreSQL + Supabase Storage
└── frontend/    → React + Vite + Tailwind CSS
```

## تشغيل المشروع محليًا

### 1. الباك إند
```bash
cd backend
npm install
cp .env.example .env      # واملأ القيم الحقيقية (DATABASE_URL, SUPABASE_URL...)
npm run migrate           # إنشاء جداول قاعدة البيانات
npm run dev                # تشغيل السيرفر على http://localhost:5000
```

### 2. الفرونت إند
```bash
cd frontend
npm install
cp .env.example .env      # تأكد إن VITE_API_BASE_URL بيشاور على الباك إند
npm run dev                # تشغيل الموقع على http://localhost:5173
```

### 3. إنشاء أول حساب أدمن
لسه مفيش صفحة تسجيل، فأول أدمن بينضاف مباشرة في قاعدة البيانات:

```sql
INSERT INTO admins (name, email, password_hash, role)
VALUES ('اسمك', 'you@example.com', '<bcrypt_hash_here>', 'admin');
```

لتوليد الـ password_hash، شغّل في أي مكان فيه Node:
```js
require('bcryptjs').hashSync('your_password', 10)
```

## التوثيق التفصيلي
- تصميم قاعدة البيانات والعلاقات: [`backend/src/database/README.md`](./backend/src/database/README.md)

## أهم الميزات المُنفّذة
- ✅ تصفح هرمي: جامعة → كلية → سنة → ترم → مادة → ملفات
- ✅ رفع ملفات بدون تسجيل حساب (بحالة "قيد المراجعة")
- ✅ لوحة تحكم أدمن: قبول/رفض الملفات، إحصائيات، إشعارات
- ✅ بحث فوري بكل الملفات المعتمدة
- ✅ وضع داكن/فاتح، تصميم متجاوب بالكامل

## جاهز للتوسع مستقبلاً
راجع جدول "التوسع المستقبلي" في [`backend/src/database/README.md`](./backend/src/database/README.md) — كل ميزة جديدة (تسجيل دخول، مفضلة، تقييمات، GPA Calculator...) بتتضاف كجدول أو عمود جديد فقط، بدون إعادة هيكلة.
