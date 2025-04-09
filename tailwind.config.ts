module.exports = {
    content: ['./app/**/*.tsx', './components/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo-600
                secondary: '#9333EA', // Purple-600
                accent: '#14B8A6', // Teal-500
                error: '#EF4444', // Red-500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}