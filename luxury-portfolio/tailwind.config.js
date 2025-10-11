/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury color palette
        gold: {
          50: '#FFFDF5',
          100: '#FFF8DC',
          200: '#FFE55C',
          300: '#FFD700',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#996515',
        },
        diamond: {
          50: '#F0FDFF',
          100: '#B9F2FF',
          200: '#7EC8E3',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
