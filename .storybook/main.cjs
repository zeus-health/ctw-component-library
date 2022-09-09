module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mock/register",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {},
  features: {
    storyStoreV7: true,
  },
};
