/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100vh",
      },
      backgroundColor: {
        watermelon: {
          50: "#fff1f2",
          100: "#ffe4e7",
          200: "#fecdd5",
          300: "#fda4b2",
          400: "#fb5875",
          500: "#f53e63",
          600: "#e21c4f",
          700: "#bf1142",
          800: "#a0113e",
          900: "#88133b",
          950: "#4c051b",
        },
      },
      textColor: {
        watermelon: {
          50: "#fff1f2",
          100: "#ffe4e7",
          200: "#fecdd5",
          300: "#fda4b2",
          400: "#fb5875",
          500: "#f53e63",
          600: "#e21c4f",
          700: "#bf1142",
          800: "#a0113e",
          900: "#88133b",
          950: "#4c051b",
        },
      },
      borderColor: {
        watermelon: {
          50: "#fff1f2",
          100: "#ffe4e7",
          200: "#fecdd5",
          300: "#fda4b2",
          400: "#fb5875",
          500: "#f53e63",
          600: "#e21c4f",
          700: "#bf1142",
          800: "#a0113e",
          900: "#88133b",
          950: "#4c051b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: "var(--font-raleway)",
      },
    },
  },
  plugins: [],
};
