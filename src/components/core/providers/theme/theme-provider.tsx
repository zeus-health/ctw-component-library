import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "./context";
import i18next, { Locals } from "@/i18n";
import { DefaultTheme, EmptyTailwindCSSVars, mapToCSSVar, Theme } from "@/styles/tailwind.theme";
import { merge } from "@/utils/nodash";
import "../../main.scss";

export type ThemeProviderProps = {
  theme?: Theme;
  locals?: Locals;
};

export function ThemeProvider({
  children,
  locals,
  theme = {},
}: PropsWithChildren<ThemeProviderProps>) {
  const ctwThemeRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<string>("");

  // Manually compute our CSS theme string AND the
  // fix for empty tailwind CSS vars.
  // We have to apply this manually instead of `style={style}`
  // as we want to use a string instead of an object where react would
  // drop the empty variables!
  useEffect(() => {
    const styles = {
      ...mapToCSSVar(theme.colors || {}),
      ...EmptyTailwindCSSVars,
    };

    // Convert our styles into a style string.
    setStyle(
      Object.entries(styles)
        .map(([key, value]) => `${key}:${value}`)
        .join(";")
    );
  }, [ctwThemeRef, theme]);

  // Manually apply our CSS theme string to the ctw-theme class.
  useEffect(() => {
    ctwThemeRef.current?.setAttribute("style", style);
  }, [ctwThemeRef, style]);

  // Workaround for https://github.com/tailwindlabs/headlessui/discussions/666
  // Note: We want the portal root to:
  //    1. Be a child of body.
  //    2. Have our theme styles.
  useEffect(() => {
    // Remove any existing portal root.
    document.getElementById("headlessui-portal-root")?.remove();

    // Create a new portal root.
    const el = document.createElement("div");
    el.id = "headlessui-portal-root";

    // It needs at least one child, so that HeadlessUI doesn't remove this portal root workaround
    // https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-react/src/components/portal/portal.tsx#L84
    el.innerHTML = "<div/>";

    // Apply our theme styles and add the portal root to the body.
    el.setAttribute("style", style);
    document.body.appendChild(el);
  }, [style]);

  // Overwrite our i18next resources with any provided to CTWProvider.
  useEffect(() => {
    if (locals) {
      Object.entries(locals).forEach(([lang, namespaces]) => {
        Object.entries(namespaces).forEach(([namespace, resources]) => {
          i18next.addResourceBundle(lang, namespace, resources);
        });
      });
    }
  }, [locals]);

  const contextValue = useMemo(
    () => ({
      // Set our context theme to our default theme merged
      // with any of the provided theme overwrites.
      // This way consumers of useTheme can get access to
      // the full true theme being applied.
      theme: merge({}, DefaultTheme, theme),
      ctwThemeRef,
    }),
    [theme, ctwThemeRef]
  );

  return (
    <div ref={ctwThemeRef} className="ctw-theme">
      <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    </div>
  );
}
