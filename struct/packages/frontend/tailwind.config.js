/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C58B',
          dark: '#16A085',
          light: '#4FD1A5',
        },
        secondary: '#16A085',
        'light-green': '#E9F8F3',
        bg: '#F7FAF9',
        card: '#FFFFFF',
        'text-dark': '#1F2937',
        'text-light': '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: 0, transform: 'translateX(-30px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: 0, transform: 'translateX(30px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
