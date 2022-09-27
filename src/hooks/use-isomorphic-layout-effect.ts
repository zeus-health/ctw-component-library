// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useEffect, useLayoutEffect } from "react";

// Wraps use of useLayoutEffect in a guard to protect against SSR uses.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
