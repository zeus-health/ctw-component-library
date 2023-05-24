import Client from "fhir-kit-client";
import { createContext } from "react";
import { Env } from "./types";

export type FeatureFlags = {
  enableViewFhirButton?: boolean;
};

export type CTWState = {
  env: Env;
  builderId?: string;
  headers?: HeadersInit;
  featureFlags?: FeatureFlags;
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
