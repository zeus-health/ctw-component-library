import { useEffect, useState } from "react";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./use-ctw";

export function useRequestContext() {
  const { getRequestContext } = useCTW();
  const [requestContext, setRequestContext] = useState<CTWRequestContext>();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const ctx = await getRequestContext();
      if (isMounted) {
        setRequestContext(ctx);
      }
    }

    void load();
    return () => {
      isMounted = false;
    };
  }, [getRequestContext]);

  return requestContext;
}
