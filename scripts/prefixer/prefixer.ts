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
  addPrefixes(prefix, filesToPrefix());
  rmSync("scripts/prefixer/tmp", { recursive: true }); // Clear the temp directory
}

function tailwindNoPrefixGen() {
  let tailwindConfig = readFileSync("tailwind.config.cjs", "utf-8");
  if (!existsSync("./scripts/prefixer/tmp")) {
    mkdirSync("./scripts/prefixer/tmp");
  }
  writeFileSync(
    "scripts/prefixer/tmp/tailwind.config.cjs",
    tailwindConfig.replace(/prefix: "\S*",\n/g, "")
  );
  let cssGenerate = spawnSync(
    "tailwindcss -c ./scripts/prefixer/tmp/tailwind.config.cjs -i ./src/styles/tailwind.css -o ./scripts/prefixer/tmp/tailwind-gen-unprefixed.css",
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
    ...glob.sync(dir + ".ts"),
    ...glob.sync(dir + ".tsx"),
    ...glob.sync(dir + ".css", { ignore: cssIgnore }),
  ];
}

// Add classname prefixes to a series of files
function addPrefixes(prefix: string, files: string[]) {
  let stringsToPrefix = getStringsToPrefix();

  for (const file of files) {
    console.log(`Processing ${file}`);
    // Add prefix in CSS file
    let replaced = readFileSync(file, "utf-8");
    stringsToPrefix.forEach((toPrefixUnconverted) => {
      let toPrefix = toPrefixUnconverted.toString();
      replaced = replaced.replace(
        // Replaces non-prefixed appearances of this class name that aren't part of a larger word. Be careful, this can replace things you didn't want to.
        getReplaceRegEx(file, toPrefix),
        `ctw-${toPrefix}`
      );
      console.log(`\tReplaced "${toPrefix}" with "ctw-${toPrefix}"`);
    });
    writeFileSync(file, replaced, "utf-8");
  }
}

function getReplaceRegEx(file: string, toPrefix: string): RegExp {
  if (file.split(".").pop() === "css") {
    // Add prefix in a CSS file
    return new RegExp(
      `(?<!\\w|\\w-)` + // Not part of another name (part 1)
        `(?<!${prefix})` + // Not already prefixed
        toPrefix +
        `(?!\\w|-)`, // Not part of another name (part 2)
      "g"
    );
  } else {
    // Add prefix in another file (ts/tsx)
    return new RegExp(
      `(?<!import )(?<! from ")` + // Not an import
        `(?<!\\w|\\w-|\\.)` + // Not part of another name, incl not already prefixed (part 1), not a property/function
        `(?<!${prefix})` + // Not already prefixed
        toPrefix +
        `(?!\\w|-|\\.)`, // Not part of another name (part 2), not an object
      "g"
    );
  }
}

// Get just the list of the parts of the string that we need to prefix
function getStringsToPrefix(): Set<String> {
  let map = JSON.parse(readFileSync(mapFile, "utf-8")).selectors;
  let stringsToPrefix = new Set<String>();
  for (let oldClassName in map) {
    if (oldClassName.charAt(0) == ".") {
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
  }
  return stringsToPrefix;
}

main();

export {};
