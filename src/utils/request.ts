import { QueryClient } from "@tanstack/react-query";

export type UseQueryResultBasic<T> = {
  data: T;
  isLoading: boolean;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // NOTE: Stale time must be kept less than what we'd expect auth token
      // expiration to be. This ensures that if the token expires and we go to
      // fetch a fresh one, we don't get a stale token from react-query cache.
      staleTime: 1000 * 30, // 30s.
      refetchOnWindowFocus: false,
    },
  },
});

export const CTW_REQUEST_HEADER = { "Zus-Request-Source": "component-library" };

export type CTWRequestInit = {
  headers?: Record<string, string>;
} & Omit<RequestInit, "headers">;

export function ctwFetch(
  input: RequestInfo | URL,
  init?: CTWRequestInit
): Promise<Response> {
  const headers = init?.headers || {};
  headers["Zus-Request-Source"] = "component-library";

  const newInit: CTWRequestInit = init || {};
  newInit.headers = headers;

  return fetch(input, newInit);
}
