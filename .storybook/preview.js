// Always include our main styles to get tailwind and
// anything else our components may depend on.
import "../src/components/core/main.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
