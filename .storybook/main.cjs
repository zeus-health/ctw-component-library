const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    // Disabling debugger for now as it currently doesn't
    // really work.
    interactionsDebugger: false,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
  // Build configuration
  async viteFinal(config, { configType }) {
    const overrides = {
      build: {},
      server: {},
    };
    if (configType === "DEVELOPMENT") {
      overrides.build.sourcemap = true;
    }
    if (configType === "PRODUCTION") {
      overrides.build.sourcemap = false;
    }
    return mergeConfig(config, overrides);
  },
};
