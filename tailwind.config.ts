import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#050508",
          elevated: "#0c0c10",
          card: "#0a0a0e",
          border: "#1a1a22",
          "border-light": "#2a2a35",
        },
        accent: {
          DEFAULT: "#00ff88",
          muted: "#00cc6a",
          soft: "rgba(0, 255, 136, 0.08)",
          glow: "rgba(0, 255, 136, 0.4)",
        },
        terminal: {
          green: "#00ff88",
          cyan: "#00d4ff",
          purple: "#a855f7",
          orange: "#ff9500",
          red: "#ff4757",
          yellow: "#ffd93d",
        },
        ink: {
          primary: "#f0f0f5",
          secondary: "#8888a0",
          tertiary: "#55556a",
          muted: "#3a3a4a",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blink": "blink 1s step-end infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "typing": "typing 3.5s steps(40, end)",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 255, 136, 0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0, 212, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 0% 100%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(0, 255, 136, 0.03) 0%, transparent 50%, rgba(0, 212, 255, 0.02) 100%)",
        "grid-pattern":
          "linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #00ff88 0deg, #00d4ff 120deg, #a855f7 240deg, #00ff88 360deg)",
      },
      backgroundSize: {
        "grid-lg": "60px 60px",
        "grid-sm": "30px 30px",
      },
      boxShadow: {
        "glow": "0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1)",
        "glow-lg": "0 0 40px rgba(0, 255, 136, 0.4), 0 0 80px rgba(0, 255, 136, 0.2)",
        "card": "0 4px 30px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 255, 136, 0.1)",
        "card-hover": "0 8px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 136, 0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
