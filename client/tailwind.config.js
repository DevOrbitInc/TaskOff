/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1D1D1F",
        paper: "#FBFBFD",
        section: "#F5F5F7",
        muted: "#6E6E73",
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
        sans: ["-apple-system", "'SF Pro Display'", "Inter", "sans-serif"],
        mono: ["'SF Mono'", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)",
      },
      fontSize: {
        xs: "11px",
        sm: "13px",
        base: "15px",
        xl: "20px",
        "3xl": "28px",
        "5xl": "52px",
      },
      letterSpacing: {
        tight: "-.01em",
        tighter: "-.02em",
        tightest: "-.03em",
      },
    },
  },
  plugins: [],
};
