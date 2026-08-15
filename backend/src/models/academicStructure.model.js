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

// ---------- Colleges ----------
const findCollegesByUniversity = async (universityId) => {
    const { rows } = await query(
        'SELECT * FROM colleges WHERE university_id = $1 ORDER BY name',
        [universityId]
    );
    return rows;
};

// ---------- Academic Years ----------
const findAcademicYearsByCollege = async (collegeId) => {
    const { rows } = await query(
        'SELECT * FROM academic_years WHERE college_id = $1 ORDER BY order_index',
        [collegeId]
    );
    return rows;
};

const createAcademicYear = async ({ collegeId, name, orderIndex }) => {
    const { rows } = await query(
        `INSERT INTO academic_years (college_id, name, order_index)
         VALUES ($1, $2, $3) RETURNING *`,
        [collegeId, name, orderIndex]
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
    findCollegesByUniversity,
    findAcademicYearsByCollege,
    createAcademicYear,
    findSemestersByAcademicYear,
    createSemester,
};
