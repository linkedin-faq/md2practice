// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      //   backgroundColor: {
      //   primary: "var(--color-bg-primary)",
      //   secondary: "var(--color-bg-secondary)",
      // },
      // textColor: {
      //   accent: "var(--color-text-accent)",
      //   primary: "var(--color-text-primary)",
      //   secondary: "var(--color-text-secondary)",
      // },
        colors:{
        primary: colors.violet,
        secondary: colors.blue,
      },
    },
  },
  variants: {
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"],
    extend: {},
  },
  plugins: [],
}
