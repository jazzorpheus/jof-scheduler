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
        "jof-blue-dark": "#041A26",
        "jof-blue-med": "#03273D",
        "jof-blue-light": "#3A5E76",
        "jof-gray-dark": "#0a192f",
        "jof-gray-med": "#0a192f",
        "jof-gray-light": "#0a192f",
      },
    },
  },
  plugins: [],
};
