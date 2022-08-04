const lineClampPlugin = require("@tailwindcss/line-clamp");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
      brand: {
        50: "#FCFAF4",
        100: "#F4EBD2",
        200: "#EEE1BB",
        300: "#E9D7A4",
        400: "#E3CD8D",
        500: "#DDC377",
        600: "#D8B960",
        700: "#D2AF49",
        800: "#CDA533",
        900: "#C79B1C",
      },
      primary: {
        50: "#FAF5FF",
        100: "#F3E8FF",
        200: "#E9D5FF",
        300: "#D8B4FE",
        400: "#C084FC",
        500: "#A855F7",
        600: "#9333EA",
        700: "#7E22CE",
        800: "#6B21A8",
        900: "#581C87",
      },
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      info: {
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#BAE6FD",
        300: "#7DD3FC",
        400: "#38BDF8",
        500: "#0EA5E9",
        600: "#0284C7",
        700: "#0369A1",
        800: "#075985",
        900: "#0C4A6E",
      },
      good: {
        50: "#ECFDF5",
        100: "#D1FAE5",
        200: "#A7F3D0",
        300: "#6EE7B7",
        400: "#34D399",
        500: "#10B981",
        600: "#059669",
        700: "#047857",
        800: "#065F46",
        900: "#064E3B",
      },
      caution: {
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        300: "#FCD34D",
        400: "#FBBF24",
        500: "#F59E0B",
        600: "#D97706",
        700: "#B45309",
        800: "#92400E",
        900: "#78350F",
      },
      alert: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
      },
    },
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [lineClampPlugin],
  prefix: "ctw-",
};
