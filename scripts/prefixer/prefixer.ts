import { readFile, rmdirSync, writeFile } from "fs";
import * as readline from "readline";
var rcs = require("rename-css-selectors");
const { spawn } = require("child_process");
const glob = require("glob");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rcs.process
  .css(
    glob.sync("./**/*.css", { ignore: ["./src/styles/tailwind.css"] }),
    // all css files are now saved, renamed and stored in the selectorLibrary
    {
      ignoreCssVariables: true,
      preventRandomName: true,
      replaceKeyframes: true,
    }
  )
  .then(() => {
    try {
      rmdirSync("./rcs", { recursive: true });
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
        /(?!"selectors":)(?!": {)(?:"\.?([^a-z]*)([^\s"]+:)?([^a-z]*)(?:ctw-)*([^"]*)":[^,\n]*)/g,
        '"$1$2$3$4": "$1$2$3ctw-$4"'
      );
      writeFile(
        "./scripts/prefixer/renaming_map.json",
        newContent,
        { flag: "w+" },
        (err) => {
          rl.question(
            "Please make sure that the new class names in scripts/renaming_map.json are acceptable and modify accordingly before refactoring. \n [y] - Refactor \n [q] - Quit \n >",
            (answer) => {
              switch (answer.toLowerCase()) {
                case "y":
                  spawn(
                    "tsc scripts/prefixer/prefixer_apply.ts && node scripts/prefixer/prefixer_apply.js",
                    [],
                    { shell: true, stdio: "inherit" }
                  );
                  break;
                case "q":
                  rl.close();
                  break;
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
