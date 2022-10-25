# Prefixer

Adds the "ctw-" (or other) prefix to unprefixed Tailwind CSS selectors in a target file. Helps initially move components from CTW App to this library.

## Usage

Run the following in the project directory: `npx ts-node --esm scripts/prefixer/prefixer.ts`

## Limitations

- Uses regex to find where to add the prefix to the file, so the job may not be perfect.
- The portions of which Tailwind selectors to prefix are hard-coded. If Tailwind adds prefixes, the script will need to be updated.
