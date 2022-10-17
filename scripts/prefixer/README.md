# Prefixer

Adds the "ctw-" (or other) prefix to unprefixed Tailwind CSS selectors in a target file. Helps initially move components from CTW App to this library.

## Usage

1. Set the target file in `scripts/prefixer/prefixer.ts`
1. Run the following in the project directory: `npx ts-node --esm scripts/prefixer/prefixer.ts`

## Limitations

Uses regex to find what to replace and where, so may not perfectly replace each instance of the class name.
If an incorrect or missing renaming was found, edit the `renamings.json` file.
