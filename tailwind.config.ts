import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT: "#FF6B5B", dark: "#E04E3E" },
        teal: { DEFAULT: "#00B8A9" },
        sun: "#FFC845",
        lilac: "#8C7AE6",
        charcoal: { DEFAULT: "#0F172A", 800: "#1E293B", 700: "#334155" },
        ink: { DEFAULT: "#0F172A", dark: "#0B1120" },
        surface: "#F8FAFC",
        paper: "#F4F1EA",
        border: "#E5E7EB",
        borderWarm: "#E7E2D6",
        slate: "#64748B",
        renter: { red: "#DC2626" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
        "barlow-condensed": ["Barlow Condensed", "Arial", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)",
        "subtle-hover": "0 4px 6px rgba(15,23,42,0.04), 0 12px 24px rgba(15,23,42,0.1)",
        coral: "0 4px 14px rgba(255,107,91,0.25)",
        "float-lg": "0 10px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config
