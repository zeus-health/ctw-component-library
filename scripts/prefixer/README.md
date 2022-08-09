# Prefixer

Adds the ctw- prefix to every CSS class in any CSS file in the folder where the following command is run, if it does not already have the prefix.

## Usage

`npx ts-node --esm scripts/prefixer/prefixer.ts`

## How

[prefixer.ts](prefixer.ts) generates a mapping of original CSS class names to their prefixed versions based on the CSS files in `/src`.  
Then, [prefixer_apply](prefixer_apply.ts) applies the mapping to the files in the directory.

[View the Regex in prefixer.ts that adds prefixes to a map](http://regexr.com/6rflc)
[View the Regex to apply a map on typescript files](http://regexr.com/6rflo)

## Limitation

This may miss some of the CSS classes (e.g. `.shadow`) or try to rename ones that you don't want to rename (e.g. `#root`). Make sure these edge cases are added/cleaned in [renaming_map.json](renaming_map.json) before you hit apply, or restart but remember to fix the map to undo the mistake.  
These mistakes will re-appear in the mapping file if you start the script over again, as it is regenerated each time.

If there is an entire CSS file you don't want the script to pull classes to rename from (e.g. tailwind.css), make sure to add it in [prefixer.ts](prefixer.ts) `ignore`.
