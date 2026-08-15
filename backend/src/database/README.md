# Database Schema — منصة تعليمية لطلاب الكلية

## طريقة التشغيل

### تشغيل كل الجداول دفعة واحدة
```bash
psql -U your_user -d your_database -f migrations/000_full_schema.sql
```

### أو تشغيل كل ملف على حدة بالترتيب (مفضّل للتتبع في Git)
```bash
for file in migrations/0*.sql; do
  psql -U your_user -d your_database -f "$file"
done
```

### تشغيل البيانات الابتدائية (Seeds)
```bash
psql -U your_user -d your_database -f seeds/001_seed_categories.sql
psql -U your_user -d your_database -f seeds/002_seed_demo_structure.sql   # اختياري - بيانات تجريبية فقط
```

---

## مخطط العلاقات (ERD)

```
universities (1) ──< (N) colleges
colleges (1) ──< (N) academic_years
academic_years (1) ──< (N) semesters
semesters (1) ──< (N) subjects
subjects (1) ──< (N) files
categories (1) ──< (N) files
admins (1) ──< (N) files            (عمود reviewed_by)
admins (1) ──< (N) notifications
files (1) ──< (N) notifications     (عمود related_file_id)
colleges (1) ──< (N) users          (جاهز مستقبلاً)
users (1) ──< (N) files             (عمود uploaded_by_user_id، جاهز مستقبلاً)
```

## التسلسل الهرمي للمحتوى

```
University → College → Academic Year → Semester → Subject → Files
```

كل مستوى مربوط بالمستوى اللي فوقه بـ Foreign Key + `ON DELETE CASCADE`،
يعني لو اتحذفت جامعة، هتتحذف تلقائيًا كل الكليات والسنين والترمات والمواد
والملفات التابعة ليها (احذر عند الحذف في الإنتاج).

## ملاحظات تصميمية مهمة

1. **لا يوجد جدول `upload_requests` منفصل** — تم الاستغناء عنه، وحالة الملف
   نفسها (`files.status = 'pending'`) هي اللي بتمثل "طلب الرفع". ده بيقلل
   تكرار البيانات.

2. **البحث السريع**: عمود `files.title` عليه فهرس Full-Text Search
   (`idx_files_search`) عشان البحث الفوري يبقى سريع حتى مع آلاف الملفات.

3. **الترتيب المخصص**: أعمدة `order_index` في `academic_years` و`semesters`
   بتخلي الأدمن يتحكم في ترتيب العرض بدل الاعتماد على الـ `id`.

4. **التوسع بدون كسر الهيكل**: أي ميزة مستقبلية (مفضلة، تقييمات، نقاط،
   GPA...) بتتضاف كجدول جديد أو عمود جديد فقط — راجع الجدول التالي:

| الميزة المستقبلية | التنفيذ |
|---|---|
| تسجيل دخول كامل | تفعيل `users` + JWT middleware |
| مفضلة | جدول جديد `favorites (user_id, file_id)` |
| تقييمات/تعليقات | جدولين `ratings`, `comments` مربوطين بـ `file_id` |
| GPA Calculator | جدول جديد `grades` |
| جدول محاضرات | جدول جديد `schedules` |
| تلخيص AI للـ PDF | عمود `ai_summary TEXT` في `files` |

## ترتيب ملفات Migrations

| # | الملف | الوصف |
|---|---|---|
| 001 | `create_universities_table` | الجامعات |
| 002 | `create_colleges_table` | الكليات |
| 003 | `create_academic_years_table` | السنوات الدراسية |
| 004 | `create_semesters_table` | الترمات |
| 005 | `create_subjects_table` | المواد |
| 006 | `create_categories_table` | تصنيفات الملفات |
| 007 | `create_admins_table` | حسابات الأدمن |
| 008 | `create_users_table` | حسابات الطلاب (غير مفعّلة بعد) |
| 009 | `create_files_table` | الملفات (الجدول المركزي) |
| 010 | `create_notifications_table` | إشعارات الأدمن |
| 011 | `create_updated_at_triggers` | تحديث `updated_at` تلقائيًا |
