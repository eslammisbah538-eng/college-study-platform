/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                // خلفية ورقية دافية بدل الكريمي المعتاد
                paper: {
                    light: '#F6F4EF',
                    dark: '#14151C',
                },
                surface: {
                    light: '#FFFFFF',
                    dark: '#1D2029',
                },
                ink: {
                    light: '#1C1D24',
                    dark: '#EDEBE4',
                },
                // أزرق أكاديمي غامق - اللون الأساسي
                primary: {
                    50: '#EEF0FD',
                    100: '#D9DEFA',
                    300: '#8C97EC',
                    500: '#3B4FD9',
                    600: '#2F3FB8',
                    700: '#26339578',
                    900: '#1A2266',
                },
                // أصفر الهايلايتر - لون تفاعلي
                accent: {
                    DEFAULT: '#F2B705',
                    dark: '#D9A400',
                },
                muted: '#8B8D98',
                success: '#2FA774',
                danger: '#E1543A',
            },
            fontFamily: {
                display: ['Tajawal', 'sans-serif'],
                body: ['Tajawal', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            borderRadius: {
                card: '14px',
            },
            boxShadow: {
                card: '0 2px 10px rgba(26, 34, 102, 0.06)',
                'card-hover': '0 8px 24px rgba(26, 34, 102, 0.12)',
            },
        },
    },
    plugins: [],
};
