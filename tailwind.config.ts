import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#0a0a0b",
          elevated: "#141416",
          border: "#27272a",
        },
        accent: {
          DEFAULT: "#f59e0b",
          muted: "#d97706",
          soft: "rgba(245, 158, 11, 0.12)",
        },
        ink: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
          tertiary: "#71717a",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(120, 113, 108, 0.08) 0%, transparent 50%)",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "card-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
        "section-band":
          "linear-gradient(180deg, transparent 0%, rgba(245, 158, 11, 0.03) 50%, transparent 100%)",
      },
      backgroundSize: {
        "grid-sm": "48px 48px",
      },
    },
  },
  plugins: [],
};
export default config;
