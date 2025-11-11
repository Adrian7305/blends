/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['Montserrat', 'monospace'],
      },
      colors: {
        black: '#000000',
        purple: {
          DEFAULT: '#761cbc',
          light: '#a955f7',
          dark: '#5c159b',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      boxShadow: {
        glow: '0 0 10px #761cbc, 0 0 20px #761cbc, 0 0 30px #761cbc',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #761cbc 0%, #000000 100%)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideIn: { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #761cbc' },
          '50%': { boxShadow: '0 0 20px #a955f7' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
