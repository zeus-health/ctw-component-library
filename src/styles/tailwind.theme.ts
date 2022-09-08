export const CLASS_PREFIX = "ctw-";

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
    },
  },
};

// Theme type is a nested partial
export type Theme = Subset<typeof TailwindTheme["colors"]>;
type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

// Helps name a CSS variable based on the class prefix.
export function nameCSSVar(name: string): string {
  return `--${CLASS_PREFIX}-${name}`;
}

// Takes a theme and turns it into a CSSProperties that sets CSS Variables.
export function mapToCSSVar(colorConfig: Theme): { [key: string]: string } {
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
