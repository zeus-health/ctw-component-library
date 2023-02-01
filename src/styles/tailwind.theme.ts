// DO NOT IMPORT OUTSIDE THINGS WITHIN THIs FILE!
// We compile this file and any imports will get compiled
// to .js files which would then need to be cleaned up.

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

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
    },
    error: {
      main: "#EF4444",
      light: "#FEE2E2",
      dark: "#7F1D1D",
      text: "#991B1B",
      message: "#B91C1B",
      bg: "#FEF2F2",
      icon: "#F97171",
    },
    success: {
      main: "#10B981",
      light: "#D1FAE5",
    },
    caution: {
      main: "#F59E0B",
      light: "#FEF3C7",
      heading: "#92400E",
      message: "#B45309",
      bg: "#FFFBEB",
      icon: "#FBBF24",
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

// Some post processing workflows (older versions of PostCSS) will
// incorrectly remove tailwind's empty CSS variables.
// To fix this, we manually apply them in CTWProvider.
// See https://github.com/tailwindlabs/tailwindcss/issues/2889#issuecomment-734238826
export const EmptyTailwindCSSVars: Record<string, string> = {
  "--tw-pan-x": " ",
  "--tw-pan-y": " ",
  "--tw-pinch-zoom": " ",
  "--tw-ordinal": " ",
  "--tw-slashed-zero": " ",
  "--tw-numeric-figure": " ",
  "--tw-numeric-spacing": " ",
  "--tw-numeric-fraction": " ",
  "--tw-ring-inset": " ",
  "--tw-blur": " ",
  "--tw-brightness": " ",
  "--tw-contrast": " ",
  "--tw-grayscale": " ",
  "--tw-hue-rotate": " ",
  "--tw-invert": " ",
  "--tw-saturate": " ",
  "--tw-sepia": " ",
  "--tw-drop-shadow": " ",
  "--tw-backdrop-blur": " ",
  "--tw-backdrop-brightness": " ",
  "--tw-backdrop-contrast": " ",
  "--tw-backdrop-grayscale": " ",
  "--tw-backdrop-hue-rotate": " ",
  "--tw-backdrop-invert": " ",
  "--tw-backdrop-opacity": " ",
  "--tw-backdrop-saturate": " ",
  "--tw-backdrop-sepia": " ",
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
      properties[nameCSSVar(colorTitle)] = hexToRGB(colorValueOrObj);
    } else {
      Object.entries(colorValueOrObj).forEach(([colorName, value]) => {
        properties[nameCSSVar(`${colorTitle}-${colorName}`)] = hexToRGB(value);
      });
    }
  });
  return properties;
}

// Converts hex values to RGB values if it's not already in RGB format.
function hexToRGB(colorMapping: string, opacity?: string): string {
  if (colorMapping.startsWith("#")) {
    const r = parseInt(colorMapping.slice(1, 3), 16);
    const g = parseInt(colorMapping.slice(3, 5), 16);
    const b = parseInt(colorMapping.slice(5, 7), 16);
    if (opacity) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
  return colorMapping;
}
