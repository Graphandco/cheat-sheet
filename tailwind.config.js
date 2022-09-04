/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        container: {
            padding: '2rem',
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#95c11e',
                    secondary: '#212121',
                    accent: '#a78bfa',
                    neutral: '#1B1D1D',
                    'base-100': '#212121',
                    info: '#2463EB',
                    success: '#16A249',
                    warning: '#DB7706',
                    error: '#DC2828',
                },
            },
        ],
    },
};
