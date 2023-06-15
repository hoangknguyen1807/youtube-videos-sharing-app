/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#fff',
                secondary: '#F1F4FA',
                text: '#06152B',
                submit: '#266e73',
                completed: '#FF69B4',
                ongoing: '#2FE5A7',
                'border-default': '#d0d7de',
                menu: '#cbd5e1'
            }
        }
    },
    plugins: [
        require('tailwindcss-scoped-groups')({
            groups: ['one', 'two']
        })
    ]
};
