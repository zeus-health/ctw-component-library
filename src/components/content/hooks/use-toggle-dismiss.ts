import { useCallback, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { toggleDismiss } from "@/fhir/basic";
import { FHIRModel } from "@/fhir/models/fhir-model";

interface UseToggleDismissResult {
  /**
   * Function to call to toggle the archive status of the FHIR model
   */
  toggleDismiss: (model: FHIRModel<fhir4.Resource>) => Promise<void>;

  /**
   * True when `toggleArchive` is called
   */
  isLoading: boolean;
}

/**
 * This hook is toggles the dismiss status for the specified FHIR model.
 */
export function useToggleDismiss(): UseToggleDismissResult {
  const { getRequestContext } = useCTW();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleDismiss = useCallback(async (model: FHIRModel<fhir4.Resource>) => {
    setIsLoading(true);
    await toggleDismiss(model, await getRequestContext());
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    toggleDismiss: handleToggleDismiss,
    isLoading,
  };
}
