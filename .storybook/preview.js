// Always include our main styles to get tailwind and
// anything else our components may depend on.
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../src/components/core/main.scss";

initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];
