import { Theme } from "@/styles/tailwind.theme";
import { createContext } from "react";
import type { Env } from "./ctw-provider";

export type CTWToken = {
  accessToken: string;
  issuedTokenType: string;
  tokenType: string;
  expiresAt: number;
};

export type CTWState = {
  env: Env;
  authToken?: string;
  headers?: HeadersInit;
  authTokenURL?: string;
  theme?: Theme;
  token?: CTWToken;
  actions: {
    handleAuth: () => Promise<string>;
  };
};

export const CTWStateContext = createContext<CTWState | undefined>(undefined);
