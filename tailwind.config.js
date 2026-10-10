module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        paper: "#f8fafc",
        accent: "#0f766e",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 70px -36px rgba(15, 23, 42, 0.3)",
      },
    },
  },
  plugins: [],
};
