import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { AuthenticationContext, CTWToken } from "./context";
import { claimsExp } from "@/utils/auth";
import { QUERY_KEY_AUTH_TOKEN } from "@/utils/query-keys";
import { ctwFetch, queryClient } from "@/utils/request";

// We use an expiry padding to provide a buffer to prevent race conditions.
// A race condition could happen in that we check if the token is expired,
// it isn't, but by time we do our request(s) it has expired.
const EXPIRY_PADDING_MS = 60000;

export type AuthenticationProviderProps = {
  headers?: Record<string, string>;
  authToken?: string;
  authTokenURL?: string;
};

export function AuthenticationProvider({
  children,
  authToken,
  authTokenURL,
  headers,
}: PropsWithChildren<AuthenticationProviderProps>) {
  const [token, setToken] = useState<CTWToken>();

  if (!authToken && !authTokenURL) {
    throw new Error("Either authToken or authTokenURL is required");
  }

  const getAuthToken = useCallback(async () => {
    if (authToken) {
      return authToken;
    }

    const newToken = await checkOrRefreshAuth(token, authTokenURL, headers);
    if (token?.accessToken !== newToken.accessToken) {
      setToken(newToken);
    }
    return newToken.accessToken;
  }, [token, authToken, authTokenURL, headers]);

  const contextValue = useMemo(
    () => ({
      token,
      getAuthToken,
    }),
    [token, getAuthToken]
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>{children}</AuthenticationContext.Provider>
  );
}

async function checkOrRefreshAuth(
  token?: CTWToken,
  url?: string,
  headers?: Record<string, string>
): Promise<CTWToken> {
  if (!token || Date.now() >= token.expiresAt + EXPIRY_PADDING_MS) {
    const response = await queryClient.fetchQuery([QUERY_KEY_AUTH_TOKEN, url], async () =>
      ctwFetch(url as string, { headers })
    );
    const newToken = await response.json();
    return {
      accessToken: newToken.access_token,
      expiresAt: claimsExp(newToken.access_token) * 1000,
    };
  }
  return token;
}
