import useResizeObserverTemp from "@react-hook/resize-observer";
import { RefObject, useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";
import { useTheme } from "@/components/core/providers/theme/use-theme";
import { defaultBreakpoints } from "@/styles/tailwind.theme";
import { mapValues } from "@/utils/nodash";

// This is an ugly hack / work around for a SSR/CommonJS/build
// issue where useResizeObserver is getting compiled to
// foo = require("@react-hook/resize-observer")
// instead of
// foo = require("@react-hook/resize-observer").default
// causing a "foo is not a function" error.
// This shouldn't be a problem when using ES Modules or for
// libraries that don't use default exports!
const useResizeObserver: typeof useResizeObserverTemp =
  // @ts-ignore
  useResizeObserverTemp.default || useResizeObserverTemp;

type BreakpointKeys = keyof typeof defaultBreakpoints;
export type Breakpoints = Record<BreakpointKeys, boolean>;

export function useBreakpoints<T extends HTMLElement>(target: RefObject<T>) {
  const { theme } = useTheme();
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(
    mapValues(defaultBreakpoints, () => false)
  );

  function updateBreakpoints() {
    const targetEl = target.current;
    if (!targetEl) return;
    const { width } = targetEl.getBoundingClientRect();

    // Fix bug where display: none / hidden would cause
    // a component to have 0 width. In this case we don't want
    // to update our breakpoints. This fixes an issue with TabGroup
    // where switching tabs in ZAP would cause a flash as
    // the component was initially "stacked" due to 0 width.
    if (width === 0) return;

    const breakpointsTmp = {} as Breakpoints;
    Object.entries(theme.breakpoints).forEach(([key, value]) => {
      breakpointsTmp[key as keyof Breakpoints] = width < value;
    });
    setBreakpoints(breakpointsTmp);
  }

  // Update on initial render (useIsomorphicLayoutEffect) and
  // on any resizes.
  useIsomorphicLayoutEffect(updateBreakpoints, [target, theme]);
  useResizeObserver(target, (_) => updateBreakpoints());

  return breakpoints;
}
