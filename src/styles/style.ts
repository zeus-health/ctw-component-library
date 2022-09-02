export const CssVarsArray = [
  "--ctw--transparent",
  "--ctw--white",
  "--ctw--black",
  "--ctw--primary-lighter",
  "--ctw--primary-light",
  "--ctw--primary-main",
  "--ctw--primary-dark",
  "--ctw--icon-default",
  "--ctw--icon-light",
  "--ctw--icon-active",
  "--ctw--divider-main",
  "--ctw--divider-light",
  "--ctw--content-black",
  "--ctw--content-light",
  "--ctw--content-lighter",
  "--ctw--content-reverse",
  "--ctw--error-main",
  "--ctw--error-light",
  "--ctw--success-main",
  "--ctw--success-light",
  "--ctw--caution-main",
  "--ctw--caution-light",
  "--ctw--info-main",
  "--ctw--info-light",
  "--ctw--bg-white",
  "--ctw--bg-lighter",
  "--ctw--bg-light",
  "--ctw--bg-dark",
  "--ctw--bg-black",
] as const;

export type CssVars = typeof CssVarsArray[number];

export type Style = {
  [cssVar in CssVars]?: string;
};

export function setStyle(
  style: Style | undefined,
  styleDeclaration: CSSStyleDeclaration
) {
  if (style) {
    Object.entries(style).forEach(([cssVar, val]) =>
      styleDeclaration.setProperty(cssVar, val)
    );
  }
}
