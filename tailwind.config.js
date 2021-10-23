const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
      },
      screens: {
        DEFAULT: '100%',
        sm: '100%',
        md: '768px',
      },
    },
    extend: {
      animation: {
        'pulse-slow': 'pulse 15s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['Nunito Sans', ...fontFamily.sans],
      },
      listStyleType: {
        square: 'square',
      },
      opacity: {
        15: '.15',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
