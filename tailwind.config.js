/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        "jof-blue-dark": "#051720",
        "jof-blue-med": "#03273c",
        "jof-blue-med-light": "#003554",
        "jof-blue-light-med": "#004166",
        "jof-blue-light": "#76b0d5",
      },
    },
  },
  plugins: [],
};
