# Prefixer

Blindly adds the "ctw-" (or other) prefix to CSS selectors to a specified file, to help initially move components from CTW App to this library.

## Usage

1. Set the configurables at the top of `scripts/prefixer/prefixer.ts`
1. Run the following in the project directory: `npx ts-node --esm scripts/prefixer/prefixer.ts`
1. Look over the new file and make manual corrections.

## Limitations

Assume there are extra or missing prefixes, or that prefixes may be added in a way that doesn't match how tailwind prefixes it. This replaces very loosely.

- It assumes every word in a string is a selector to be prefixed.
- It uses RegEx to find what and where to prefix in the files
- This doesn't _change_ prefixes, only add them.
