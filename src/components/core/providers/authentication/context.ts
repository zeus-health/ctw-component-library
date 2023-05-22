import { createContext } from "react";

export type CTWToken = {
  accessToken: string;
  expiresAt: number; // Timestamp in ms.
};

export interface AuthenticationContextValue {
  getAuthToken: () => Promise<string>;
}

export const AuthenticationContext = createContext<AuthenticationContextValue>({
  getAuthToken: () => Promise.resolve(""),
});
