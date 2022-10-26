/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@kensho-technologies/eslint-config",
    "prettier",
    "plugin:storybook/recommended",
  ],
  // Ignore js files as we now have typescript parsing rules.
  // See https://stackoverflow.com/a/65063702 for more.
  ignorePatterns: [
    "*.js",
    "*.cjs",
    "vite.config.ts",
    "vitest.*.ts",
    "src/main.tsx",
    "src/SecuredApp.tsx",
    "src/App.tsx",
    "src/error-boundary.tsx",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-use-before-define": "off",
    curly: "error",
    "import/extensions": "off",
    "import/order": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        // The following files can depend on devDependencies.
        devDependencies: [
          "*.config.*",
          "*.env.*",
          "scripts/**/*",
          "**/*.test.*",
          "test/**/*",
        ],
      },
    ],
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react",
            importNames: ["useLayoutEffect"],
            message:
              "`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect` instead.",
          },
        ],
      },
    ],
  },
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 27,
    },
  },
};
