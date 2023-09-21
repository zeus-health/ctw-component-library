import { useEffect, useState } from "react";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./use-ctw";

export function useRequestContext() {
  const { getRequestContext } = useCTW();
  const [requestContext, setRequestContext] = useState<CTWRequestContext>();

  useEffect(() => {
    async function load() {
      let isMounted = true;
      await getRequestContext().then((context) => {
        if (isMounted) setRequestContext(context);
      });
      return () => {
        isMounted = false;
      };
    }

    void load();
  }, [getRequestContext]);

  return requestContext;
}
