import api from './api';

/**
 * رفع ملف جديد - بيدعم ملف فعلي (FormData) أو رابط خارجي بس
 */
export const uploadService = {
    submitFile: (fields, file) => {
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value);
            }
        });
        if (file) {
            formData.append('file', file);
        }

        return api
            .post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => res.data);
    },
};
