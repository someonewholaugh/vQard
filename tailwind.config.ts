/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black': '#121212',
        'black-secondary': '#242424',
        'white': '#faf9f5',
      },
      fontFamily: {
        'projekt-blackbird': ['Projekt Blackbird', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
