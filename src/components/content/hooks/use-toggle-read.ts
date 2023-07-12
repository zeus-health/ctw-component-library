import { useCallback, useState } from "react";
import { setTimeout } from "timers";
import { useCTW } from "@/components/core/providers/use-ctw";
import { toggleRead } from "@/fhir/basic";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { QUERY_KEY_BASIC } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

interface UseToggleReadResult {
  /**
   * Function to call to toggle the read status of the FHIR model
   */
  toggleRead: (model: FHIRModel<fhir4.Resource>) => void;

  /**
   * True when `toggleRead` is called
   */
  isLoading: boolean;
}

/**
 * This hook toggles the read status for the specified FHIR model.
 */
export function useToggleRead(): UseToggleReadResult {
  const { getRequestContext } = useCTW();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleRead = useCallback(async (model: FHIRModel<fhir4.Resource>) => {
    const requestContext = await getRequestContext();
    // In production we want to avoid non-builder users from inadvertantly marking records as read
    // In lower environments this is allowed for demos/testing
    if (requestContext.env === "production" && requestContext.userType !== "builder") {
      return;
    }
    setIsLoading(true);
    await toggleRead(model, await getRequestContext());
    await queryClient.invalidateQueries([QUERY_KEY_BASIC]);

    // Timeout here fixes bug where we would briefly flash
    // the old mark as read/new text.
    setTimeout(() => setIsLoading(false), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    toggleRead: handleToggleRead,
    isLoading,
  };
}
