import config from "../../packages/tailwind-config/index.js";

console.dir(config.theme);
// Type definitions
export const CssVarsArray = [
  ...JSON.stringify(config).matchAll(/"var\(([^),\s]*)(?:, [^)]*)?\)"/g),
].map((match) => match[1]);
export type CssVars = typeof CssVarsArray[number];

console.log(CssVarsArray);

export type Style = {
  [cssVar in CssVars]?: string;
};

export function setStyle(
  style: Style | undefined,
  styleDeclaration: CSSStyleDeclaration
) {
  if (style) {
    for (const cssVar in style) {
      styleDeclaration.setProperty(cssVar, style[cssVar] || "");
    }
  }
}
