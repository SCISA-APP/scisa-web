/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B0000', // Deep Red
          light: '#A52A2A',
          dark: '#600000',
        },
        secondary: '#F3F4F6', // Light Gray
        surface: '#FFFFFF',
        background: '#FAFAFA', // Off-white background
        text: {
          primary: '#111827', // Almost Black
          secondary: '#4B5563', // Dark Gray
          muted: '#9CA3AF', // Light Gray
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [],
}