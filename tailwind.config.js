module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        paper: "#f8fafc",
        accent: "#0A84FF",
        "accent-hover": "#409CFF",
        "surface-dark": "#1C1C1E",
        "apple-text": "#F5F5F7",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 24px 70px -36px rgba(15, 23, 42, 0.3)",
      },
    },
  },
  plugins: [],
};
