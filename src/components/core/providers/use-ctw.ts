import { useCallback, useContext } from "react";
import { useAuthentication } from "./authentication/use-authentication";
import { CTWRequestContext, CTWStateContext } from "./ctw-context";
import { getFhirClient } from "@/fhir/client";
import { getFetchFromFqs } from "@/services/fqs/client";
import { claimsBuilderId } from "@/utils/auth";

export function useCTW() {
  const context = useContext(CTWStateContext);
  const { getAuthToken } = useAuthentication();

  if (context === undefined) {
    throw new Error("useCTW must be used within a CTWProvider");
  }

  const getRequestContext = useCallback(async () => {
    const authToken = await getAuthToken();
    const requestContext: CTWRequestContext = {
      env: context.env,
      authToken,
      builderId: context.builderId ?? claimsBuilderId(authToken) ?? "",
      contextBuilderId: context.builderId,
      fhirClient: getFhirClient(context.env, authToken, context.builderId),
      fetchFromFqs: getFetchFromFqs(context.env, authToken, context.builderId),
    };
    return requestContext;
  }, [context, getAuthToken]);

  return {
    getRequestContext,
    featureFlags: context.featureFlags,
  };
}
