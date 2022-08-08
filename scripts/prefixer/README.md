# Prefixer

Adds the ctw- prefix to every CSS class in any CSS file in the folder where the following command is run, if it does not already have the prefix.

## Usage

Remove `type: "module"` from `package.json` temporarily.  
Run `tsc scripts/prefixer.ts && node scripts/prefixer.js `

## Limitations

If a CSS class has the same name as an import, the import will end up renamed as well. You'll have to manually change it back in VS Code using the find and replace in all files feature.
