/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000',
        'text-primary': '#1E293B',
        'text-secondary': '#4A5565',
        'bg-dark': '#1a1a1a',
        'text-light': '#e5e7eb',
        'text-muted': '#9ca3af',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}