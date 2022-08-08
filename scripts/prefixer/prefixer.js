"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var readline = require("readline");
var rcs = require("rename-css-selectors");
var spawn = require("child_process").spawn;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rcs.process
    .css(["src/**/*.css"], 
// all css files are now saved, renamed and stored in the selectorLibrary
{
    ignoreCssVariables: true,
    preventRandomName: true,
    replaceKeyframes: true
})
    .then(function () {
    try {
        (0, fs_1.rmdirSync)("./rcs", { recursive: true });
    }
    catch (err) {
        console.error("Error while deleting ./rcs.");
    }
    rcs.mapping.generate("./scripts/prefixer/", { overwrite: true }, function (err) {
        // the mapping file draft was generated
        remap();
    });
});
function remap() {
    // add the prefixes to the mapping file
    (0, fs_1.readFile)("./scripts/prefixer/renaming_map.json", "utf-8", function (err, contents) {
        var newContent = contents.replace(/(?!"selectors":)(?!": {)(?:"\.?([^a-z]*)([^\s"]+:)?([^a-z]*)(?:ctw-)*([^"]*)":[^,\n]*)/g, '"$1$2$3$4": "$1$2$3ctw-$4"');
        (0, fs_1.writeFile)("./scripts/prefixer/renaming_map.json", newContent, { flag: "w+" }, function (err) {
            rl.question("Please make sure that the new class names in scripts/renaming_map.json are acceptable and modify accordingly before refactoring. \n [y] - Refactor \n [q] - Quit \n >", function (answer) {
                switch (answer.toLowerCase()) {
                    case "y":
                        spawn("tsc scripts/prefixer/prefixer_apply.ts && node scripts/prefixer/prefixer_apply.js", [], { shell: true, stdio: "inherit" });
                        break;
                    case "q":
                        rl.close();
                        break;
                    default:
                        console.log("Invalid answer.");
                }
                rl.close();
            });
        });
    });
}
