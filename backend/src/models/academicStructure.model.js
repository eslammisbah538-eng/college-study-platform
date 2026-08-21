/**
 * academicStructure.model.js
 * موديل موحد للتسلسل الهرمي: الجامعات، الكليات، السنوات، الترمات
 * (جُمعوا في ملف واحد لأنهم بسطاء وعملياتهم متشابهة - عكس files/subjects
 *  اللي ليهم منطق أعقد فاتفصلوا في ملفاتهم الخاصة)
 */

const { query } = require('../config/db');

// ---------- Universities ----------
const findAllUniversities = async () => {
    const { rows } = await query('SELECT * FROM universities ORDER BY name');
    return rows;
};
const createUniversity = async ({ name }) => {
    const slug = name.trim().replace(/\s+/g, '-');
    const { rows } = await query(
        `INSERT INTO universities (name, slug) VALUES ($1, $2) RETURNING *`,
        [name, slug]
    );
    return rows[0];
};

// ---------- Colleges ----------
const findCollegesByUniversity = async (universityId) => {
    const { rows } = await query(
        'SELECT * FROM colleges WHERE university_id = $1 ORDER BY name',
        [universityId]
    );
    return rows;
};
const createCollege = async ({ universityId, name }) => {
    const slug = name.trim().replace(/\s+/g, '-');
    const { rows } = await query(
        `INSERT INTO colleges (university_id, name, slug) VALUES ($1, $2, $3) RETURNING *`,
        [universityId, name, slug]
    );
    return rows[0];
};

// ---------- Departments ----------
const findDepartmentsByCollege = async (collegeId) => {
    const { rows } = await query(
        'SELECT * FROM departments WHERE college_id = $1 ORDER BY name',
        [collegeId]
    );
    return rows;
};

const createDepartment = async ({ collegeId, name }) => {
    const slug = name.trim().replace(/\s+/g, '-');
    const { rows } = await query(
        `INSERT INTO departments (college_id, name, slug) VALUES ($1, $2, $3) RETURNING *`,
        [collegeId, name, slug]
    );
    return rows[0];
};

// ---------- Academic Years ----------
const findAcademicYearsByDepartment = async (departmentId) => {
    const { rows } = await query(
        'SELECT * FROM academic_years WHERE department_id = $1 ORDER BY order_index',
        [departmentId]
    );
    return rows;
};

const createAcademicYear = async ({ departmentId, name, orderIndex }) => {
    const { rows } = await query(
        `INSERT INTO academic_years (department_id, name, order_index)
         VALUES ($1, $2, $3) RETURNING *`,
        [departmentId, name, orderIndex]
    );
    return rows[0];
};

// ---------- Semesters ----------
const findSemestersByAcademicYear = async (academicYearId) => {
    const { rows } = await query(
        'SELECT * FROM semesters WHERE academic_year_id = $1 ORDER BY order_index',
        [academicYearId]
    );
    return rows;
};

const createSemester = async ({ academicYearId, name, orderIndex }) => {
    const { rows } = await query(
        `INSERT INTO semesters (academic_year_id, name, order_index)
         VALUES ($1, $2, $3) RETURNING *`,
        [academicYearId, name, orderIndex]
    );
    return rows[0];
};
module.exports = {
    findAllUniversities,
    createUniversity,
    findCollegesByUniversity,
    createCollege,
    findDepartmentsByCollege,
    createDepartment,
    findAcademicYearsByDepartment,
    createAcademicYear,
    findSemestersByAcademicYear,
    createSemester,
};

