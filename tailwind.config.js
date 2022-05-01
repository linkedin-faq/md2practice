/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      tablet: '640px',
      desktop: '1024px',
    },
    extend: {
      colors: {
        primary: {
          ...colors.emerald,
          dark: { ...colors.slate },
        },
        secondary: {
          ...colors.blue,
          dark: {
            ...colors.violet,
          },
        },
      },
    },
  },
  plugins: [],
};
