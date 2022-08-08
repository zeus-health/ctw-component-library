import { readFile, rmdirSync, writeFile } from "fs";
import * as readline from "readline";
var rcs = require("rename-css-selectors");
const { spawn } = require("child_process");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rcs.process
  .auto(
    ["./src/**/*.ts", "./src/**/*.tsx", "./src/**/*.css"],
    // all css files are now saved, renamed and stored in the selectorLibrary
    { optimize: false }
  )
  .then(() => {
    try {
      rmdirSync("./rcs", { recursive: true });
      console.log(`./rcs is deleted!`);
    } catch (err) {
      console.error(`Error while deleting ./rcs.`);
    }

    rcs.mapping.generate(
      "./scripts/prefixer/",
      { overwrite: true },
      (err: any) => {
        // the mapping file draft was generated
        remap();
      }
    );
  });

function remap() {
  // add the prefixes to the mapping file
  readFile(
    "./scripts/prefixer/renaming_map.json",
    "utf-8",
    (err: any, contents: string) => {
      const newContent = contents.replace(
        /(?!"selectors":)(?!": {)(?:"([^a-z]*)(ctw-)*([^"]*)":[^,\n]*)/g,
        '"$1$2$3": "$1ctw-$3"'
      );
      writeFile(
        "./scripts/prefixer/renaming_map.json",
        newContent,
        { flag: "w+" },
        (err) => {
          rl.question(
            "Please make sure that: \n- The new class names in scripts/renaming_map.json are acceptable. \n- All CSS files that need prefixes have been generated. \n [y] - Refactor \n [q] - Quit \n",
            (answer) => {
              switch (answer.toLowerCase()) {
                case "y":
                  spawn(
                    "tsc scripts/prefixer/prefixer_2.ts && node scripts/prefixer/prefixer_2.js",
                    [],
                    { shell: true, stdio: "inherit" }
                  );
                  break;
                case "q":
                  rl.close();
                default:
                  console.log("Invalid answer.");
              }
              rl.close();
            }
          );
        }
      );
    }
  );
}

export {};
