const dir = "./src/**/*";
const mapDir = "./scripts/prefixer/renaming_map.json";

var rcs = require("rename-css-selectors");
const fs = require("fs");
const glob = require("glob");

let files: string[] = [
  ...glob.sync(dir + ".ts"),
  ...glob.sync(dir + ".tsx"),
  ...glob.sync(dir + ".css", { ignore: ["./src/styles/*.css"] }),
];

let map = JSON.parse(fs.readFileSync(mapDir)).selectors;

for (const file of files) {
  fs.readFile(file, "utf-8", (err, contents) => {
    if (err) {
      console.log(err);
      return;
    }
    let replaced = contents;

    for (const oldClassName in map) {
      if (file.split(".").pop() === "css") {
        replaced = replaced.replaceAll(
          new RegExp(
            `\\n(\\s*)([^\\w\\d\\s]|@keyframes )${oldClassName}([^\\w\\d])`,
            "g"
          ),
          `\n$1$2${map[oldClassName]}$3`
        );
      } else {
        replaced = replaced.replaceAll(
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
