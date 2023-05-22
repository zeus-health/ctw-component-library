import { useQuery } from "@tanstack/react-query";
import { CTWRequestContext } from "./ctw-context";
import { useCTW } from "./use-ctw";

export function useQueryWithCTW<T, T2>(
  queryKey: string,
  keys: T2[],
  query: (requestContext: CTWRequestContext, keys?: T2[]) => Promise<T>,
  enabled = true
) {
  const { getRequestContext } = useCTW();

  return useQuery(
    [queryKey, ...keys],
    async () => {
      const requestContext = await getRequestContext();
      return query(requestContext, keys);
    },
    { enabled }
  );
}
