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
        "jof-blue-dark": "#051A26",
        "jof-blue-med": "#03273c",
        "jof-blue-med-light": "#003554",
        "jof-blue-light-med": "#004166",
        "jof-blue-light": "#76b0d5",

        // **********************

        "jof-blue-900": "#051A26",
        "jof-blue-800": "#072536",
        "jof-blue-700": "#03273c",
        "jof-blue-600": "#04334E",
        "jof-blue-500": "#053F61",
        "jof-blue-400": "#064C74",
      },
    },
  },
  plugins: [],
};
