// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,css,html}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c084fc', // violet
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        navy: {
          DEFAULT: '#0a0e23',
          50: '#f0f1f5',
          100: '#d9dde8',
          200: '#b3b9c8',
          300: '#8c95a7',
          400: '#657185',
          500: '#3f4c64',
          600: '#1e2a43',
          700: '#0a0e23',
          800: '#080b1c',
          900: '#060815',
        },
        charcoal: {
          DEFAULT: '#1e1e2d',
        },
      },
    },
  },
  plugins: [],
};
