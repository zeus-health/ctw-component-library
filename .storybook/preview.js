// Always include our main styles to get tailwind and
// anything else our components may depend on.
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../src/components/core/main.scss";

// By default MSW assumes the service worker will be at
// root/mockServiceWorker.js
// This isn't true on github pages, so we have to tell it
// where the file is with the prefix path of the repo name.
let options = {
  onUnhandledRequest(req) {
    if (req.url.hostname.includes("zusapi")) {
      console.warn(
        "[MSW] Warning: captured a request without a matching",
        "request handler:\n\n",
        req.method,
        req.url.href
      );
    }
  },
};

if (location.hostname === "zeus-health.github.io") {
  options.serviceWorker = {
    url: "/ctw-component-library/mockServiceWorker.js",
  };
}

initialize(options);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];
