/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          happy: '#FFD93D',
          excited: '#FEC6A1',
          calm: '#98D8AA',
          sad: '#A7BBC7',
          angry: '#FF6B6B',
        },
        purple: {
          50: '#F3F1FF',
          100: '#E9E4FF',
          200: '#D8CEFF',
          300: '#BCA4FF',
          400: '#9B7AFF',
          500: '#7C3AFF',
          600: '#6E2FFF',
          700: '#5A1DE0',
          800: '#4A18B8',
          900: '#3B1492',
        },
      },
    },
  },
  plugins: [],
} 