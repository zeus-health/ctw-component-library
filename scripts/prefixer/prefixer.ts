import { spawnSync } from "child_process";
import { readFile, readFileSync, rmSync, writeFileSync } from "fs";
import glob from "glob";
import readline from "readline";
import rcs from "rename-css-selectors";

// Configurables
const dir = "./src/**/*";
const mapDir = "./scripts/prefixer/renaming_map.json";
const cssIgnore = ["./src/styles/tailwind.css"]; // Filepaths to avoid pulling classes from and prefixing to.

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let files: string[] = [
  ...glob.sync(dir + ".ts"),
  ...glob.sync(dir + ".tsx"),
  ...glob.sync(dir + ".css", { ignore: cssIgnore }),
];

tailwindNoPrefixGen();
getClasses();

function tailwindNoPrefixGen() {
  let tailwindConfig = readFileSync("tailwind.config.cjs", "utf-8");
  tailwindConfig = tailwindConfig.replace('"ctw-"', '""');
  writeFileSync("tailwind.config.cjs", tailwindConfig, "utf-8");
  let cssGenerate = spawnSync("npm run generate:css", [], {
    shell: true,
    stdio: "inherit",
  });
}

function getClasses() {
  rcs.process
    .css(
      glob.sync("./**/*.css", { ignore: cssIgnore }),
      // all css files are now saved, renamed and stored in the selectorLibrary
      {
        ignoreCssVariables: true,
        preventRandomName: true,
        replaceKeyframes: true,
      }
    )
    .then(() => {
      try {
        rmSync("./rcs", { recursive: true });
      } catch (err) {
        console.error(`Error while deleting ./rcs.`);
      }

      rcs.mapping.generate(
        "./scripts/prefixer/",
        { overwrite: true },
        (err: any) => {
          // the mapping file draft was generated
          prefixFiles();
        }
      );
    });
}

function prefixFiles() {
  let map = JSON.parse(readFileSync(mapDir, "utf-8")).selectors;

  for (const file of files) {
    readFile(file, "utf-8", (err, contents) => {
      if (err) {
        console.log(err);
        return;
      }
      let replaced = contents;

      for (let oldClassName in map) {
        if (oldClassName.charAt(0) == ".") {
          // Only select selectors, not for example things that start with #
          oldClassName = oldClassName.substring(1); // Exclude the dot from counting as part of the class name
          let toPrefix = oldClassName;

          let maybePseudoClass = "";
          if (oldClassName.includes(":")) {
            let splitClassName = oldClassName.split(":");
            toPrefix = splitClassName.pop() || "";
            maybePseudoClass = splitClassName.join(":") + ":";
          }

          let maybeDash = "";
          if (toPrefix.startsWith("-")) {
            maybeDash = "-";
            toPrefix = toPrefix.substring(1);
          }

          if (!toPrefix.startsWith("ctw-")) {
            let newClassName = maybePseudoClass + maybeDash + "ctw-" + toPrefix;
            // Add prefix in CSS file
            if (file.split(".").pop() === "css") {
              replaced = replaced.replace(
                // Replaces non-prefixed appearances of this class name that aren't part of a larger word. Be careful, this can replace things you didn't want to.
                new RegExp(`(?<!ctw-)(?<!\\w)${oldClassName}(?!\\w)`, "g"),
                newClassName
              );
            } else {
              // Add prefix in another file (ts/tsx)
              replaced = replaced.replace(
                new RegExp(
                  `(?<! from )` + // Don't replace if it's an import line (with " from " right before it)
                    `("(?:.*\\s)?)` + // Look for the start of a string, can list classes before this class
                    oldClassName + // Look for this class inside the string
                    `((?:\\s.*)?")`, // Look for the end of the string, can list classes before this class
                  "g"
                ),
                "$1" + newClassName + "$2" // Add the classes before and after this one back, along with the renamed class.
              );
            }
          }
        }
      }
      writeFileSync(file, replaced, "utf-8");
    });
  }
  rmSync("./scripts/prefixer/renaming_map.json");
  tailwindPrefixGen();
}

function tailwindPrefixGen() {
  let tailwindConfig = readFileSync("tailwind.config.cjs", "utf-8");
  tailwindConfig = tailwindConfig.replace('prefix: ""', 'prefix: "ctw-"');
  writeFileSync("tailwind.config.cjs", tailwindConfig, "utf-8");
  let cssGenerate = spawnSync("npm run generate:css", [], {
    shell: true,
    stdio: "inherit",
  });
  rl.close();
}

export {};
