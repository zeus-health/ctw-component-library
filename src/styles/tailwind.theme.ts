import { Subset } from "../utils/typescript";

export const CLASS_PREFIX = "ctw-";

export const defaultBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export const TailwindTheme = {
  colors: {
    transparent: "transparent",
    white: "#fff",
    black: "#000",
    primary: {
      lighter: "#FAF5FF",
      light: "#F3E8FF",
      main: "#A855F7",
      dark: "#7E22CE",
    },
    icon: {
      default: "#374151",
      light: "#D1D5DB",
      active: "#A855F7",
    },
    divider: {
      main: "#D1D5DB",
      light: "#E5E7EB",
    },
    content: {
      black: "#111827",
      light: "#6B7280",
      lighter: "#9CA3AF",
      reverse: "#FFFFFF",
    },
    error: {
      main: "#EF4444",
      light: "#FEE2E2",
    },
    success: {
      main: "#10B981",
      light: "#D1FAE5",
    },
    caution: {
      main: "#F59E0B",
      light: "#FEF3C7",
      burgundy: "#92400E",
      lightred: "#B45309",
    },
    info: {
      main: "#0EA5E9",
      light: "#E0F2FE",
    },
    bg: {
      white: "#FFFFFF",
      lighter: "#F9FAFB",
      light: "#F3F4F6",
      dark: "#E5E7EB",
      black: "#111827",
      yellow: "#FFFBEB",
    },
  },
};

// Theme type is a nested partial
export type ColorTheme = Subset<typeof TailwindTheme["colors"]>;
export type Theme = {
  colors?: ColorTheme;
  breakpoints?: Subset<typeof defaultBreakpoints>;
};
export const DefaultTheme = {
  ...TailwindTheme,
  breakpoints: defaultBreakpoints,
};

// Helps name a CSS variable based on the class prefix.
export function nameCSSVar(name: string): string {
  return `--${CLASS_PREFIX}-${name}`;
}

// Takes a theme and turns it into a CSSProperties that sets CSS Variables.
export function mapToCSSVar(colorConfig: ColorTheme): Record<string, string> {
  const properties: { [variable: string]: string } = {};
  Object.entries(colorConfig).forEach(([colorTitle, colorValueOrObj]) => {
    if (typeof colorValueOrObj === "string") {
      properties[nameCSSVar(colorTitle)] = colorValueOrObj;
    } else {
      Object.entries(colorValueOrObj).forEach(([colorName, value]) => {
        properties[nameCSSVar(`${colorTitle}-${colorName}`)] = value;
      });
    }
  });
  return properties;
}
