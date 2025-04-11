module.exports = {
    darkMode: 'class', // ✅ activeer class-based dark mode!
    content: ['./app/**/*.tsx', './components/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5',
                secondary: '#9333EA',
                accent: '#14B8A6',
                error: '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}