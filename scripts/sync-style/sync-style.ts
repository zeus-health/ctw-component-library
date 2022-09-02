import { copyFileSync, readFileSync, rmSync, writeFileSync } from "fs";

// Get all of the CSS Variables
async function getCssVariables(): Promise<string[]> {
  copyFileSync(
    "tailwind.config.cjs",
    "scripts/sync-style/tailwind-config/index.js"
  );

  const config = await import("./tailwind-config/index.js");

  return [
    ...JSON.stringify(config).matchAll(/"var\(([^),\s]*)(?:, [^)]*)?\)"/g),
  ].map((match) => match[1]);
}

function updateThemeDefinition(cssVarsArray: string[]) {
  const themeFile = readFileSync("src/styles/style.ts", "utf-8");
  writeFileSync(
    "src/styles/style.ts",
    themeFile.replace(
      /const CssVarsArray = \[[^\]]*]/g,
      `const CssVarsArray = [\n  "${cssVarsArray.join('",\n  "')}",\n]`
    )
  );
}

async function main() {
  const cssVars = await getCssVariables();
  updateThemeDefinition(cssVars);
  rmSync("scripts/sync-style/tailwind-config/index.js");
}

main();
