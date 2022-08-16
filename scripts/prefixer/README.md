# Prefixer

Adds the "ctw-" (or other) prefix to CSS classes in any CSS/TS/TSX file, so long as it does not already have a prefix.

## Usage

1. If needed, manually add CSS files to ignore to cssIgnore constant in prefixer.ts. These files will be skipped and not used for prefixing.
1. Run the following in the project directory: `npx ts-node --esm scripts/prefixer/prefixer.ts`

## How

A package generates a mapping of original CSS class names based on the CSS files in `/src`. Then the script reads these and replaces them with prefixed versions in each file.

## Limitations

- This doesn't _change_ prefixes, only add them.
- This explicitly excludes CSS variables and only prefixes class selectors, not # selectors or keyframes.
- It uses RegEx to find where to prefix in the files, there may be extra or missing prefixes due to cases not accounted for.
