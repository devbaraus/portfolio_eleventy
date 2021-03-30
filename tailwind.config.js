module.exports = {
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        ubuntu: 'Ubuntu, sans-serif',
        consolas: 'Consolas, sans-serif',
        poppins: 'Poppins, sans-serif',
      },
      colors: {
        dark: '#31263e',
        light: '#44355b',
        gray: {
          // default: '',
          light: '#f0f0f7',
        },
        primary: '#ee5622',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
  ],
  purge: {
    content: ['dist/**/*.html'],
    options: {
      safelist: [],
    },
  },
}
