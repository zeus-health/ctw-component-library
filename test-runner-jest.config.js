import { getJestConfig } from "@storybook/test-runner";

export default {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  // We don't want our timers in msw to affect test run times and renders
  fakeTimers: {
    enableGlobally: true,
    doNotFake: ["nextTick"],
  },
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
};
