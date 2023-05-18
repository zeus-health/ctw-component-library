import { createContext } from "react";

export type CTWToken = {
  accessToken: string;
  expiresAt: number; // Timestamp in ms.
};

export interface AuthenticationContextValue {
  token?: CTWToken;
  getAuthToken: () => Promise<string>;
}

export const AuthenticationContext = createContext<AuthenticationContextValue>({
  getAuthToken: () => Promise.resolve(""),
});
