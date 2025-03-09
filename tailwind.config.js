/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",
        secondary: "#3B82F6",
        background: "#F8FAFC",
        text: "#1E293B",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        accentBg: "#F0F5FF",
      },
    },
  },
  plugins: [],
};
