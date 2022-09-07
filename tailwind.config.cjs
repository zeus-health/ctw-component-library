const lineClampPlugin = require("@tailwindcss/line-clamp");
const defaultTheme = require("tailwindcss/defaultTheme");
const TailwindTheme = require("./tailwind-gen.theme.cjs").TailwindTheme;
const CLASS_PREFIX = require("./tailwind-gen.theme.cjs").CLASS_PREFIX;
const addCSSVarReference =
  require("./tailwind-gen.theme.cjs").addCSSVarReference;

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
