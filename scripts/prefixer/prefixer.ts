/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "fs";
import * as renamings from "scripts/prefixer/renamings.json";

// Configurables
const target = "./src/components/core/modal.tsx";

async function main() {
  let replaced = readFileSync(target, "utf-8");
  Object.entries(renamings).forEach(([selector, replacement]) => {
    replaced = replaced.replaceAll(
      // Replaces non-prefixed appearances of this class name that aren't part of a larger word. Be careful, this can replace things you didn't want to.
      new RegExp(
        `(?<!import .*)` + // Not an import
          `(?<!\\w|\\w-|\\.)` + // Not part of another name, incl not already prefixed (part 1), not a property/function
          `(?<!//.*)` + // Not part of a comment
          `(?<=".*)` + // Preceded somewhere on that line by a quotation mark
          `${selector}`, // Thing to prefix
        "g"
      ),
      replacement
    );
  });
  writeFileSync(target, replaced, "utf-8");
}

main();

export {};
