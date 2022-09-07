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

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

export type Style = Subset<typeof TailwindTheme["colors"]>;

function nameCSSVar(name: string): string {
  return `--${CLASS_PREFIX}-${name}`;
}

function createCSSVar(name: string, defaultVal: string): string {
  return `var(${nameCSSVar(name)}, ${defaultVal})`;
}

// Takes a theme and turns it into a CSSProperties that sets CSS Variable values
export function mapToCSSVar(colorConfig: Style): any {
  let properties: { [variable: string]: string } = {};
  const config = Object.entries(colorConfig).map(
    ([colorTitle, colorValueOrObj]) => {
      if (typeof colorValueOrObj === "string") {
        return { [colorTitle]: createCSSVar(colorTitle, colorValueOrObj) };
      }
      const transformedColorArr = Object.entries(colorValueOrObj).map(
        ([colorName, value]) => {
          properties[nameCSSVar(`${colorTitle}-${colorName}`)] = value;
          return {
            [colorName]: createCSSVar(`${colorTitle}-${colorName}`, value),
          };
        }
      );

      const flattenedTransformedColor = {};
      for (let i = 0; i < transformedColorArr.length; i++) {
        Object.assign(flattenedTransformedColor, transformedColorArr[i]);
      }

      return { [colorTitle]: flattenedTransformedColor };
    }
  );

  return properties;
}

// Loop over properties and adds css variables so that the properties can be overwritten.
export const addCSSVarReference = (colorConfig: typeof TailwindTheme) => {
  const config = Object.entries(colorConfig.colors).map(
    ([colorTitle, colorValueOrObj]) => {
      if (typeof colorValueOrObj === "string") {
        return { [colorTitle]: createCSSVar(colorTitle, colorValueOrObj) };
      }
      const transformedColorArr = Object.entries(colorValueOrObj).map(
        ([colorName, value]) => {
          return {
            [colorName]: createCSSVar(`${colorTitle}-${colorName}`, value),
          };
        }
      );

      const flattenedTransformedColor = {};
      for (let i = 0; i < transformedColorArr.length; i++) {
        Object.assign(flattenedTransformedColor, transformedColorArr[i]);
      }

      return { [colorTitle]: flattenedTransformedColor };
    }
  );

  const flattenedColors = {};
  for (let i = 0; i < config.length; i++) {
    Object.assign(flattenedColors, config[i]);
  }

  return { colors: flattenedColors };
};
