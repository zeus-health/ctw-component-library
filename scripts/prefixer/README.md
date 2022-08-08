# Prefixer

Adds the ctw- prefix to every CSS class in any CSS file in the folder where the following command is run, if it does not already have the prefix.

## How

[prefixer.ts](prefixer.ts) generates a mapping of original CSS class names to their prefixed versions based on the CSS files in `/src`.  
Then, [prefixer_apply](prefixer_apply.ts) applies the mapping to the files in the directory.

[View the Regex in prefixer.ts that adds prefixes to a map](http://regexr.com/6rflc)
[View the Regex to apply a map on CSS files](http://regexr.com/6rfms)
[View the Regex to apply a map on typescript files](http://regexr.com/6rflo)

## Usage

1. `npm run generate:css`.
1. Remove `"type": "module"` from [package.json](../../package.json).
1. `tsc scripts/prefixer/prefixer.ts && node scripts/prefixer/prefixer.js`
1. Add `prefix: "ctw-"` in [tailwind.config.cjs](../../tailwind.config.cjs)
1. Add `"type": "module"` back to [package.json](../../package.json) temporarily.
1. Re-run `generate:css` script.

## Limitation

This may miss some of the CSS classes (e.g. `.shadow`) or try to rename ones that you don't want to rename (e.g. `#root`). Make sure these edge cases are added/cleaned in [renaming_map.json](renaming_map.json) before you hit apply, or restart but remember to fix the map to undo the mistake.  
These mistakes will re-appear in the mapping file if you start the script over again, as it is regenerated each time.
