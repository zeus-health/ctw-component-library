/* eslint-disable no-console */
import { spawnSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import glob from "glob";
import rcs from "rename-css-selectors";

// Configurables
const dir = "./src/**/*";
const mapFile = "./scripts/prefixer/tmp/renaming_map.json";
// - Filepaths to avoid pulling classes from and prefixing to.
const cssIgnore = [
  "./src/styles/tailwind.css",
  "./src/styles/tailwind-gen.css", // Ignore this file because the script generates the list of unprefixed classes in /tmp
];
const prefix = "ctw-";

async function main() {
  tailwindNoPrefixGen();
  await getClasses();
  addPrefixes(filesToPrefix());
  rmSync("scripts/prefixer/tmp", { recursive: true }); // Clear the temp directory
}

function tailwindNoPrefixGen() {
  const tailwindConfig = readFileSync("tailwind.config.cjs", "utf-8");
  if (!existsSync("./scripts/prefixer/tmp")) {
    mkdirSync("./scripts/prefixer/tmp");
  }
  writeFileSync(
    "scripts/prefixer/tmp/tailwind.config.cjs",
    tailwindConfig.replace(/prefix: "\S*",\n/g, "")
  );
  const cssGenerate = spawnSync(
    "npx tailwindcss -c ./scripts/prefixer/tmp/tailwind.config.cjs -i ./src/styles/tailwind.css -o ./scripts/prefixer/tmp/tailwind-gen-unprefixed.css",
    [],
    {
      shell: true,
      stdio: "inherit",
    }
  );
}

// Produce the json file with the CSS classes
async function getClasses() {
  await rcs.process.css(
    glob.sync("./**/*.css", { ignore: cssIgnore }),
    // all css files are now saved, renamed and stored in the selectorLibrary
    {
      ignoreCssVariables: true,
      preventRandomName: true,
      replaceKeyframes: true,
    }
  );
  rmSync("./rcs", { recursive: true });
  await rcs.mapping.generate("./scripts/prefixer/tmp", { overwrite: true });
}

// Get the files the prefixes need to be added to
function filesToPrefix(): string[] {
  return [
    ...glob.sync(`${dir}.ts`),
    ...glob.sync(`${dir}.tsx`),
    ...glob.sync(`${dir}.css`, { ignore: cssIgnore }),
  ];
}

// Add classname prefixes to a series of files
function addPrefixes(files: string[]) {
  const stringsToPrefix = getStringsToPrefix();

  files.forEach((file) => {
    console.log(`Processing ${file}`);
    // Add prefix in CSS file
    let replaced = readFileSync(file, "utf-8");
    stringsToPrefix.forEach((toPrefixUnconverted) => {
      const toPrefix = toPrefixUnconverted.toString();
      replaced = replaced.replace(
        // Replaces non-prefixed appearances of this class name that aren't part of a larger word. Be careful, this can replace things you didn't want to.
        getReplaceRegEx(file, toPrefix),
        `ctw-${toPrefix}`
      );
      console.log(`\tReplaced "${toPrefix}" with "ctw-${toPrefix}"`);
    });
    writeFileSync(file, replaced, "utf-8");
  });
}

function getReplaceRegEx(file: string, toPrefix: string): RegExp {
  if (file.split(".").pop() === "css") {
    // Add prefix in a CSS file
    return new RegExp(
      `(?<!\\w|\\w-)` + // Not part of another name (part 1)
        `(?<!${prefix})${
          // Not already prefixed
          toPrefix
        }(?!\\w|-|:)`, // Not part of another name (part 2), nor a CSS property
      "g"
    );
  }
  // Add prefix in another file (ts/tsx)
  return new RegExp(
    `(?<!import .*)` + // Not an import
      `(?<!\\w|\\w-|\\.)` + // Not part of another name, incl not already prefixed (part 1), not a property/function
      `(?<!//.*)` + // Not part of a comment
      `(?<!${prefix})${
        // Not already prefixed
        toPrefix
      }(?!\\w|-|\\.)`, // Not part of another name (part 2), not an object
    "g"
  );
}

// Get just the list of the parts of the string that we need to prefix
function getStringsToPrefix(): Set<string> {
  const map = JSON.parse(readFileSync(mapFile, "utf-8")).selectors;
  const stringsToPrefix = new Set<string>();
  map.forEach((oldClassName: string) => {
    if (oldClassName.charAt(0) === ".") {
      // Only select selectors starting with ., not for example things that start with #
      let toPrefix = oldClassName.substring(1); // Exclude the dot from counting as part of the class name

      // Take out any pseudo classes
      toPrefix = oldClassName.includes(":")
        ? oldClassName.split(":").pop() || ""
        : toPrefix;
      // Take out the dash prefix if there is one
      toPrefix = toPrefix.startsWith("-") ? toPrefix.substring(1) : toPrefix;

      if (!toPrefix.startsWith(prefix)) {
        stringsToPrefix.add(toPrefix);
        console.log(`Planning to prefix the string "${toPrefix}"`);
      }
    }
  });
  return stringsToPrefix;
}

main();

export {};
