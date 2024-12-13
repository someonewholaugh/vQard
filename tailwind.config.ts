/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'projekt-blackbird': ['Projekt Blackbird', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
