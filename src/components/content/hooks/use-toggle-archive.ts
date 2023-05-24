import { useCallback, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { toggleArchive } from "@/fhir/basic";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { queryClient } from "@/utils/request";

interface UseToggleArchiveResult {
  /**
   * Function to call to toggle the archive status of the FHIR model
   */
  toggleArchive: () => void;

  /**
   * True when `toggleArchive` is called
   */
  isLoading: boolean;
}

/**
 * This hook is toggles the archive status for the specified FHIR model.
 *
 * @param model The FHIR model
 * @param queriesToInvalidate  Queries to refetch
 */
export function useToggleArchive<T extends fhir4.Resource>(
  model: FHIRModel<T>,
  ...queriesToInvalidate: string[]
): UseToggleArchiveResult {
  const { getRequestContext } = useCTW();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleArchive = useCallback(async () => {
    setIsLoading(true);
    await toggleArchive(model, await getRequestContext());
    await queriesToInvalidate.forEach((queryToInvalidate) =>
      queryClient.invalidateQueries([queryToInvalidate])
    );

    // Timeout here fixes bug where we would briefly flash
    // the old dismiss/restore text.
    setTimeout(() => setIsLoading(false), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  return {
    toggleArchive: handleToggleArchive,
    isLoading,
  };
}
