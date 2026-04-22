import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Coral/orange — the real Dars primary (hero card, CTA, tab active)
        coral: {
          50: "#FFF3EE",
          100: "#FFE3D6",
          200: "#FFC5AE",
          300: "#FFA17C",
          400: "#F47E5C",
          500: "#EC6144", // primary
          600: "#D14A30",
          700: "#A93824",
          800: "#7A281A",
          900: "#4E1810",
        },
        // Warm cream — page background
        cream: {
          50: "#FFFBF4",
          100: "#FFF7EC",
          200: "#FBEFDC",
          300: "#F4E4C6",
          400: "#E8D3A8",
        },
        // Amber/gold — achievements, Pro, badges
        amber: {
          500: "#D4A943",
          600: "#B68E2E",
        },
        // Soft sky — profile card, book icons
        sky: {
          100: "#E2F0F8",
          200: "#C6DFEE",
          300: "#A8CBE5",
        },
        // Sage — subtle success / secondary
        sage: {
          100: "#E4EADA",
          300: "#B9C6A4",
          500: "#7E9467",
        },
        // Ink — text
        ink: {
          DEFAULT: "#1A1814",
          soft: "#3B372F",
          muted: "#6E6A5F",
          subtle: "#9A9488",
        },
        border: {
          DEFAULT: "#EADFCB",
          strong: "#D6C8AB",
        },
        card: "#FFFDF8",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26, 24, 20, 0.06), 0 4px 16px -8px rgba(26, 24, 20, 0.08)",
        card: "0 4px 24px -8px rgba(26, 24, 20, 0.12), 0 2px 8px rgba(26, 24, 20, 0.04)",
        lift: "0 24px 60px -20px rgba(26, 24, 20, 0.22), 0 8px 24px -8px rgba(26, 24, 20, 0.08)",
        phone: "0 50px 90px -24px rgba(26, 24, 20, 0.28), 0 24px 48px -16px rgba(26, 24, 20, 0.18)",
        coral: "0 20px 50px -20px rgba(236, 97, 68, 0.55), 0 8px 20px -8px rgba(236, 97, 68, 0.3)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-drift": "floatDrift 9s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out both",
        "orb-emerge": "orbEmerge 1.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, -12px)" },
        },
        floatDrift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(6px, -10px)" },
          "66%": { transform: "translate(-6px, -4px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        orbEmerge: {
          "0%": {
            opacity: "0",
            transform:
              "translate(var(--orb-from-x, 0px), var(--orb-from-y, 0px)) scale(0.15)",
            filter: "blur(8px)",
          },
          "55%": { opacity: "1", filter: "blur(0)" },
          "100%": {
            opacity: "1",
            transform: "translate(0, 0) scale(1)",
            filter: "blur(0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
