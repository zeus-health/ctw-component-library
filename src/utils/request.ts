import { QueryClient, UseQueryResult } from "@tanstack/react-query";

const PROMISE_TIMEOUT = 15000; // 15s.

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
  init?: CTWRequestInit
): Promise<Response> {
  const headers = init?.headers || {};
  headers["Zus-Request-Source"] = "component-library";

  const newInit: CTWRequestInit = init || {};
  newInit.headers = headers;

  return fetch(input, newInit);
}

export async function getPromise<T, U>(
  result: UseQueryResult<T, U>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      console.log(
        "Result is loading and error",
        result.isLoading,
        result.isError
      );
      if (!result.isLoading) {
        clearInterval(interval);
        if (result.isSuccess) {
          resolve(result.data);
        } else {
          reject(result.error);
        }
      }
      if (Date.now() - startTime > PROMISE_TIMEOUT) {
        clearInterval(interval);
        reject(new Error("Request timed out."));
      }
    }, 500);
  });
}
