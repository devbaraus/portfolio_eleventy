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
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        gray: {
          // default: '',
          light: 'var(--color-gray-light)',
        },
        primary: 'var(--color-primary)',
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
