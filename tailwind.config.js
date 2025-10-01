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
        // "jof-blue-dark": "#041A26",
        "jof-blue-dark": "#051720",
        // "jof-blue-med": "#03273D",
        "jof-blue-med": "#03273c",
        // "jof-blue-light": "#3A5E76",
        "jof-blue-light": "#76b0d5",
      },
    },
  },
  plugins: [],
};
