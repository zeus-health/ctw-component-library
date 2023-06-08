import { useCallback, useContext } from "react";
import { useGetAuthToken } from "./authentication/use-get-auth-token";
import { CTWRequestContext, CTWStateContext } from "./ctw-context";
import { getFhirClients } from "@/fhir/client";
import { getFetchFromFqs } from "@/services/fqs/client";
import { claimsBuilderId } from "@/utils/auth";

export function useCTW() {
  const context = useContext(CTWStateContext);
  const getAuthToken = useGetAuthToken();

  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getRequestContext = useCallback(async () => {
    const authToken = await getAuthToken();
    const { fhirClient, fhirWriteBackClient } = getFhirClients(
      context.env,
      authToken,
      context.builderId
    );
    const requestContext: CTWRequestContext = {
      authToken,
      fhirClient,
      fhirWriteBackClient,
      env: context.env,
      builderId: context.builderId ?? claimsBuilderId(authToken) ?? "",
      contextBuilderId: context.builderId,
      fetchFromFqs: getFetchFromFqs(context.env, authToken, context.builderId),
      onResourceSave: (resource, action, error) => {
        if (context.onResourceSave) {
          context.onResourceSave(resource, action, error);
        }
      },
    };
    return requestContext;
  }, [context, getAuthToken]);

  return {
    getRequestContext,
    featureFlags: context.featureFlags,
  };
}
