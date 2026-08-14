/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1D1D1F",
        paper: "#FBFBFD",
        section: "#F5F5F7",
        signal: {
          DEFAULT: "#3B6FE0",
          soft: "#EAF0FC",
        },
        amber: {
          DEFAULT: "#E8A33D",
          soft: "#FDF3E3",
        },
        green: {
          DEFAULT: "#34C759",
          soft: "#E6F9EC",
        },
        danger: {
          DEFAULT: "#FF3B30",
          soft: "#FFEBEA",
        },
      },

      fontFamily: {
        sans: ["-apple-system", "SF Pro Display", "Inter", "sans-serif"],
        mono: ["SF Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
