# Sync Style Definition

Updates our string array literal definition of the CSS variables for [type Theme](../../src/styles/theme.ts) to the current [tailwind.config.cjs](../../tailwind.config.cjs).

## Usage

Run `npx ts-node --esm scripts/sync-style/sync-style.ts` in the main project folder.

## Logic

Imports the compiled tailwind config object by copying it into a package with type definitions. Finds all mentions of CSS variables by looking for `var(...)`.
