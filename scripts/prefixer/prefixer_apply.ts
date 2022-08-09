import { spawnSync } from "child_process";
import fs from "fs";
import glob from "glob";

const dir = "./src/**/*";
const mapDir = "./scripts/prefixer/renaming_map.json";

let files: string[] = [
  ...glob.sync(dir + ".ts"),
  ...glob.sync(dir + ".tsx"),
  ...glob.sync(dir + ".css", { ignore: ["./src/styles/*.css"] }),
];

let map = JSON.parse(fs.readFileSync(mapDir, "utf-8")).selectors;

for (const file of files) {
  fs.readFile(file, "utf-8", (err, contents) => {
    if (err) {
      console.log(err);
      return;
    }
    let replaced = contents;

    for (const oldClassName in map) {
      if (file.split(".").pop() === "css") {
        replaced = replaced.replace(
          new RegExp(`\\.${oldClassName}`, "g"),
          `.${map[oldClassName]}`
        );
      } else {
        replaced = replaced.replace(
          new RegExp(
            `(?<! from )` + // Don't replace if it's an import line with "from " right before it
              `("(?:.*\\s)?)` + // Look for the start of a string, can list classes before this class
              oldClassName + // Look for this class inside the string
              `((?:\\s.*)?")`, // Look for the end of the string, can list classes before this class
            "g"
          ),
          "$1" + map[oldClassName] + "$2" // Add the classes before and after this one back, along with the renamed class.
        );
      }
    }

    fs.writeFileSync(file, replaced, "utf-8");
  });
}

tailwindPrefixGen();

function tailwindPrefixGen() {
  let tailwindConfig = fs.readFileSync("tailwind.config.cjs", "utf-8");
  tailwindConfig = tailwindConfig.replace('prefix: ""', 'prefix: "ctw-"');
  fs.writeFileSync("tailwind.config.cjs", tailwindConfig, "utf-8");
  let cssGenerate = spawnSync("npm run generate:css", [], {
    shell: true,
    stdio: "inherit",
  });
}

export {};
