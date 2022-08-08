var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var dir = "./src/**/*";
var mapDir = "./scripts/prefixer/renaming_map.json";
var rcs = require("rename-css-selectors");
var fs = require("fs");
var glob = require("glob");
var files = __spreadArray(__spreadArray(__spreadArray([], glob.sync(dir + ".ts"), true), glob.sync(dir + ".tsx"), true), glob.sync(dir + ".css", { ignore: ["./src/styles/*.css"] }), true);
var map = JSON.parse(fs.readFileSync(mapDir)).selectors;
var _loop_1 = function (file) {
    fs.readFile(file, "utf-8", function (err, contents) {
        if (err) {
            console.log(err);
            return;
        }
        var replaced = contents;
        for (var oldClassName in map) {
            if (file.split(".").pop() === "css") {
                replaced = replaced.replaceAll(new RegExp("\\n(\\s*)([^\\w\\d\\s]|@keyframes )".concat(oldClassName, "([^\\w\\d])"), "g"), "\n$1$2".concat(map[oldClassName], "$3"));
            }
            else {
                replaced = replaced.replaceAll(new RegExp("(?<!from )(\"|(?:\".*\\s))".concat(oldClassName, "([\"(?:\\s.*\")])"), "g"), "$1" + map[oldClassName] + "$2");
            }
        }
        fs.writeFile(file, replaced, "utf-8", function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
};
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    _loop_1(file);
}
