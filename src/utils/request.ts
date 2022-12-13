import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
  builderId: string,
  init?: CTWRequestInit
): Promise<Response> {
  const headers = init?.headers || {};
  headers["Zus-Request-Source"] = "component-library";
  headers["Zus-Account"] = builderId;

  const newInit: CTWRequestInit = init || {};
  newInit.headers = headers;

  return fetch(input, newInit);
}
