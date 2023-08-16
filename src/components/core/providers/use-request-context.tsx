import { useEffect, useState } from "react";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./use-ctw";

export function useRequestContext() {
  const { getRequestContext } = useCTW();
  const [requestContext, setRequestContext] = useState<CTWRequestContext>();

  useEffect(() => {
    async function load() {
      setRequestContext(await getRequestContext());
    }

    void load();
  }, [getRequestContext]);

  return requestContext;
}
