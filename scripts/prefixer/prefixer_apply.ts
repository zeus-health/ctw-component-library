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
          new RegExp(`\.${oldClassName}`, "g"),
          `.${map[oldClassName]}`
        );
      } else {
        replaced = replaced.replace(
          new RegExp(
            `(?<!from )("|(?:".*\\s))${oldClassName}(["(?:\\s.*")])`,
            "g"
          ),
          "$1" + map[oldClassName] + "$2"
        );
      }
    }

    fs.writeFile(file, replaced, "utf-8", (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

export {};
