import { useCallback, useContext, useEffect, useRef } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";
import { CTWRequestContext, CTWStateContext } from "./ctw-context";
import { getFhirClients } from "@/fhir/client";
import { getFetchFromFqs } from "@/services/fqs/client";
import { claimsBuilderId, claimsUserType } from "@/utils/auth";

export function useCTW() {
  const context = useContext(CTWStateContext);
  const getAuthToken = useGetAuthToken();

  // Store the contextValue in a ref so it's always up to date
  const contextValueRef = useRef(context);
  useEffect(() => {
    contextValueRef.current = context;
  }, [context]);

  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getRequestContext = useCallback(async () => {
    const authToken = await getAuthToken();
    const updatedContext = contextValueRef.current || context;

    const { fhirClient, fhirWriteBackClient } = getFhirClients(
      updatedContext.env,
      authToken,
      updatedContext.builderId
    );
    const requestContext: CTWRequestContext = {
      authToken,
      headers: updatedContext.headers,
      fhirClient,
      fhirWriteBackClient,
      env: updatedContext.env,
      userType: claimsUserType(authToken) ?? undefined,
      builderId: updatedContext.builderId ?? claimsBuilderId(authToken) ?? "",
      contextBuilderId: updatedContext.builderId,
      fetchFromFqs: getFetchFromFqs(updatedContext.env, authToken, updatedContext.builderId),
      onResourceSave: (resource, action, error) => {
        if (updatedContext.onResourceSave) {
          updatedContext.onResourceSave(resource, action, error);
        }
      },
    };
    return requestContext;
  }, [context, getAuthToken]);

  return {
    env: context.env,
    getRequestContext,
    featureFlags: context.featureFlags,
  };
}
