import Client from "fhir-kit-client";
import { createContext } from "react";
import { Env } from "./types";
import { OnResourceSaveCallback } from "@/fhir/action-helper";

export type FeatureFlags = {
  enableViewFhirButton?: boolean;
  patientRequestForm?: boolean;
};

export type CTWState = {
  env: Env;
  builderId?: string;
  headers?: HeadersInit;
  featureFlags?: FeatureFlags;
  onResourceSave?: OnResourceSaveCallback;
};

export type CTWRequestContext = {
  env: Env;
  headers?: HeadersInit;
  authToken: string;
  // The user's builder ID.
  builderId: string;
  userType: string | undefined;
  // The optional builder ID used in case the user is impersonating a builder.
  contextBuilderId: string | undefined;
  fhirClient: Client;
  fhirWriteBackClient: Client;
  fetchFromFqs: (url: string, options: RequestInit) => Promise<Response>;
  onResourceSave: OnResourceSaveCallback;
};

export const CTWStateContext = createContext<CTWState | undefined>(undefined);
