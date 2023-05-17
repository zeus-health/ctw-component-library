import type { Env } from "./ctw-provider";
import Client from "fhir-kit-client";
import { createContext, RefObject } from "react";
import { Theme } from "@/styles/tailwind.theme";

export type CTWToken = {
  accessToken: string;
  expiresAt: number; // Timestamp in ms.
};

export type FeatureFlags = {
  enableViewFhirButton?: boolean;
};

export type CTWState = {
  env: Env;
  authToken?: string;
  builderId?: string;
  headers?: HeadersInit;
  authTokenURL?: string;
  featureFlags?: FeatureFlags;
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
  // The user's builder ID.
  builderId: string;
  // The optional builder ID used in case the user is impersonating a builder.
  contextBuilderId: string | undefined;
  fhirClient: Client;
  fetchFromFqs: (url: string, options: RequestInit) => Promise<Response>;
};

export const CTWStateContext = createContext<CTWState | undefined>(undefined);
