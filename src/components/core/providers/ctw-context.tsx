import type { Env } from "./ctw-provider";
import Client from "fhir-kit-client";
import { createContext, RefObject } from "react";
import { Theme } from "@/styles/tailwind.theme";

export type CTWToken = {
  accessToken: string;
  expiresAt: number; // Timestamp in ms.
};

export type FeatureFlags = {
  enablePatientImmuniztionsFhirButton?: boolean;
  enablePatientTimelineFhirButton?: boolean;
  enablePatientDocumentButton?: boolean;
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
  builderId: string;
  contextBuilderId: string | undefined;
  fhirClient: Client;
};

export const CTWStateContext = createContext<CTWState | undefined>(undefined);
