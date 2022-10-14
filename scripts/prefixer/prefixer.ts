/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "fs";

// Configurables
const target = "./src/components/core/modal.tsx";
const prefix = "ctw-";

async function main() {
  const replaced = readFileSync(target, "utf-8").replaceAll(
    // Replaces non-prefixed appearances of this class name that aren't part of a larger word. Be careful, this can replace things you didn't want to.
    new RegExp(
      `(?<!import .*)` + // Not an import
        `(?<!\\w|\\w-|\\.)` + // Not part of another name, incl not already prefixed (part 1), not a property/function
        `(?<!//.*)` + // Not part of a comment
        `(?<=".*)` + // Preceded somewhere on that line by a quotation mark
        `([\\w-:]+)`, // Thing to prefix
      "g"
    ),
    `${prefix}$1`
  );
  writeFileSync(target, replaced, "utf-8");
}

main();

export {};
