import { useCTW } from "@/components/core/ctw-provider";
import { defaultBreakpoints } from "@/styles/tailwind.theme";
import useResizeObserver from "@react-hook/resize-observer";
import { mapValues } from "lodash";
import { RefObject, useLayoutEffect, useState } from "react";

type BreakpointKeys = keyof typeof defaultBreakpoints;
type Breakpoints = Record<BreakpointKeys, boolean>;

export function useBreakpoints<T extends HTMLElement>(target: RefObject<T>) {
  const { theme } = useCTW();
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(
    mapValues(defaultBreakpoints, () => false)
  );

  function updateBreakpointClasses() {
    const targetEl = target.current;
    if (!targetEl) return;
    const { width } = targetEl.getBoundingClientRect();

    const breakpointsTmp = {} as Breakpoints;
    Object.entries(theme.breakpoints).forEach(([key, value]) => {
      breakpointsTmp[key as keyof Breakpoints] = width < value;
    });
    setBreakpoints(breakpointsTmp);
  }

  // Update on initial render (useLayout) and on any resizes.
  useLayoutEffect(updateBreakpointClasses, [target, theme]);
  useResizeObserver(target, (_) => updateBreakpointClasses());

  return breakpoints;
}
