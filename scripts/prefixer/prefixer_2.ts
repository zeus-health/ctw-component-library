const rcs = require("rename-css-selectors");

rcs.mapping.load("./scripts/renaming_map.json");
rcs.process.auto(
  ["./src/**/*.ts", "./src/**/*.tsx", "./src/**/*.css"],
  // all css files are now saved, renamed and stored in the selectorLibrary
  { newPath: ".", overwrite: true }
);
