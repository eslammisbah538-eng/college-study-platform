import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import CollegePage from '../pages/CollegePage';
import Home from '../pages/Home';

import AcademicYearPage from '../pages/AcademicYearPage';
import SemesterPage from '../pages/SemesterPage';
import SubjectPage from '../pages/SubjectPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import UploadFilePage from '../pages/UploadFilePage';
import NotFoundPage from '../pages/NotFoundPage';

import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import PendingRequests from '../pages/admin/PendingRequests';
import ManageStructure from '../pages/admin/ManageStructure';
import ManageSubjects from '../pages/admin/ManageSubjects';
import ManageFiles from '../pages/admin/ManageFiles';

export default function AppRoutes() {
    return (
        <Routes>
            {/* ---------- الصفحات العامة ---------- */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/colleges/:collegeId" element={<CollegePage />} />
                <Route path="/years/:yearId" element={<AcademicYearPage />} />
                <Route path="/semesters/:semesterId" element={<SemesterPage />} />
                <Route path="/subjects/:id" element={<SubjectPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/upload" element={<UploadFilePage />} />
            </Route>

            {/* ---------- دخول الأدمن (بدون تخطيط اللوحة) ---------- */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ---------- لوحة تحكم الأدمن (محمية) ---------- */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="pending" element={<PendingRequests />} />
                <Route path="structure" element={<ManageStructure />} />
                <Route path="subjects" element={<ManageSubjects />} />
                <Route path="files" element={<ManageFiles />} />
            </Route>

            {/* ---------- 404 ---------- */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
