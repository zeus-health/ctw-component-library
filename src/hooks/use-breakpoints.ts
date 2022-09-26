import useResizeObserver from "@react-hook/resize-observer";
import { RefObject, useLayoutEffect } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export function useClassBreakpoints<T extends HTMLElement>(
  classTarget: RefObject<T>,
  observedTarget?: RefObject<T>
) {
  function updateBreakpointClasses() {
    const targetEl = classTarget.current;
    const observedEl = observedTarget?.current ?? targetEl;
    if (!targetEl || !observedEl) return;
    const { width } = observedEl.getBoundingClientRect();

    Object.entries(breakpoints).forEach(([key, value]) => {
      targetEl.classList.toggle(`ctw-bp-${key}`, width < value);
    });
  }

  useLayoutEffect(updateBreakpointClasses, [classTarget, observedTarget]);

  // Where the magic happens
  useResizeObserver(observedTarget ?? classTarget, (entry) =>
    updateBreakpointClasses()
  );
}
