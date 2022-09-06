const lineClampPlugin = require("@tailwindcss/line-clamp");
const defaultTheme = require("tailwindcss/defaultTheme");
const TailwindTheme = require("./tailwind.theme.cjs").TailwindTheme;

const CLASS_PREFIX = "ctw-";

const createCSSVar = (name, defaultVal) =>
  `var(--${CLASS_PREFIX}-${name}, ${defaultVal})`;

// Loop over properties and adds css variables so that the properties can be overwritten.
const addCSSVarReference = (colorConfig) => {
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

module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    ...addCSSVarReference(TailwindTheme),
  },
  plugin: [lineClampPlugin],
  extend: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
    },
  },
  corePlugins: {
    preflight: false,
  },
  prefix: CLASS_PREFIX,
};
