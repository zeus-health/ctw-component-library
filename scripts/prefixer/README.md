# Prefixer

Adds the ctw- prefix to every CSS class in any CSS file in the folder where the following command is run, if it does not already have the prefix.

## Usage

If there is an entire CSS file you don't want the script to pull classes to rename from (e.g. tailwind.css), you can configure this in the script.  
Then just run the following in the project directory:  
`npx ts-node --esm scripts/prefixer/prefixer.ts`

## How

[prefixer.ts](prefixer.ts) generates a mapping of original CSS class names to their prefixed versions based on the CSS files in `/src`.  
Then, [prefixer_apply](prefixer_apply.ts) applies the mapping to the files in the directory.

## Limitations

This explicitly excludes CSS variables and only prefixes class selectors, not # selectors or keyframes.
It adds prefixes to class names in CSS files somewhat blindly, so you may need to sometimes manually remove unwanted "ctw-"'s or add in your own new rule with RegEx negative lookahead/lookbehind.
