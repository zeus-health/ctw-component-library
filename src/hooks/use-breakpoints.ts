import useResizeObserver from "@react-hook/resize-observer";
import { RefObject, useLayoutEffect, useState } from "react";

const breakpoints2 = {
  sm: 640,
  md: 768,
  lg: 1024,
};

type Breakpoints = {
  sm: boolean;
  md: boolean;
  lg: boolean;
};

export function useBreakpoints<T extends HTMLElement>(target: RefObject<T>) {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
  });

  function updateBreakpointClasses() {
    const targetEl = target.current;
    if (!targetEl) return;
    const { width } = targetEl.getBoundingClientRect();

    const breakpointsTmp = {} as Breakpoints;
    Object.entries(breakpoints2).forEach(([key, value]) => {
      breakpointsTmp[key as keyof Breakpoints] = width < value;
    });
    setBreakpoints(breakpointsTmp);
  }

  // Update on initial render (useLayout) and on any resizes.
  useLayoutEffect(updateBreakpointClasses, [target]);
  useResizeObserver(target, (_) => updateBreakpointClasses());

  return breakpoints;
}
