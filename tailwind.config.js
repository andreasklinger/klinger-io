const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './posts/**/*.mdx'],
  darkMode: 'class',
  theme: {
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
      fontFamily: {
        sans: ['Nunito Sans', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
