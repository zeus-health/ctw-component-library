import { useCallback, useState } from "react";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { toggleArchive } from "@/fhir/basic";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { ActionCallback, useAction } from "@/hooks/use-action";
import { queryClient } from "@/utils/request";

interface UseToggleArchiveResult {
  /**
   * Function to call to toggle the archive status of the FHIR model
   */
  toggleArchive: ActionCallback<unknown, void>;  

  /**
   * True when `toggleArchive` is called
   */
  isLoading: boolean;
}

/**
 * This hook is toggles the archive status for the specified FHIR model.
 * 
 * @param model The FHIR model
 * @param queryToInvalidate  Query to refetch
 */
export function useToggleArchive<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  queryToInvalidate: string
): UseToggleArchiveResult {
  const { getRequestContext } = useCTW();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateArchive = useCallback(async () => {
    setIsLoading(true);

    await toggleArchive(model, await getRequestContext());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  const handleUpdateArchive = useAction(updateArchive, {
    onSuccess: async () => {
      setIsLoading(false);
      await queryClient.invalidateQueries([queryToInvalidate]);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return {
    toggleArchive: handleUpdateArchive,
    isLoading,
  };
}
