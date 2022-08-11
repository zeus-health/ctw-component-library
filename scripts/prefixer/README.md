# Prefixer

Adds the ctw- prefix to every CSS class in any CSS file in the folder where the following command is run, if it does not already have the prefix.

## Usage

If there is an entire CSS file you don't want the script to pull classes to rename from (e.g. tailwind.css), you can configure this in the script.  
Then just run the following in the project directory:  
`npx ts-node --esm scripts/prefixer/prefixer.ts`

## How

A package generates a mapping of original CSS class names based on the CSS files in `/src`. Then the script reads these and replaces them with prefixed versions in each file.

## Limitations

This explicitly excludes CSS variables and only prefixes class selectors, not # selectors or keyframes.
It adds prefixes to class names in CSS files somewhat blindly, so you may need to sometimes manually remove unwanted "ctw-"'s or add in your own new rule with RegEx negative lookahead/lookbehind.
