/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "960px",
        lg: "1080px",
        xl: "1440px",
        "2xl": "1920px",
      },
      colors: {
        primary: "#E63946", // Crimson Red
        secondary: "#FFC107", // Amber Yellow
        background: {
          DEFAULT: "#121212", // Dark background
          paper: "#1E1E1E", // Lighter background for cards or modals
        },
        text: {
          primary: "#E1E1E1", // Off-white text
          secondary: "#A9A9A9", // Gray for secondary text
        },
        error: "#FF6F61", // Bright error color
        success: "#2A9D8F", // Emerald Green
        info: "#00A8E8", // Electric Blue
      },
    },
  },
  plugins: [],
};
