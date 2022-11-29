import Client from "fhir-kit-client";
import { createContext, RefObject } from "react";
import type { Env } from "./ctw-provider";
import { Theme } from "@/styles/tailwind.theme";

export type CTWToken = {
  accessToken: string;
  issuedTokenType: string;
  tokenType: string;
  expiresAt: number;
};

export type CTWState = {
  env: Env;
  authToken?: string;
  builderId?: string;
  headers?: HeadersInit;
  authTokenURL?: string;
  theme?: Theme;
  ctwProviderRef: RefObject<HTMLDivElement>;
  token?: CTWToken;
  actions: {
    handleAuth: () => Promise<string>;
  };
};

export type CTWRequestContext = {
  env: Env;
  authToken: string;
  builderId: string;
  fhirClient: Client;
};

export const CTWStateContext = createContext<CTWState | undefined>(undefined);
