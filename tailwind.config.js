/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'modern-black': '#0A0A0A',
        'modern-gray-50': '#FAFAFA',
        'modern-gray-100': '#F5F5F5',
        'modern-gray-200': '#E5E5E5',
        'modern-gray-300': '#D4D4D4',
        'modern-gray-400': '#A3A3A3',
        'modern-gray-500': '#737373',
        'modern-gray-600': '#525252',
        'modern-gray-700': '#404040',
        'modern-gray-800': '#262626',
        'modern-gray-900': '#171717',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-2': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-1': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-2': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 