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
    channelOptions: { allowFunction: false, maxDepth: 10 },
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
};
