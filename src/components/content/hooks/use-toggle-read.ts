import { useCallback, useState } from "react";
import { useCTW } from "@/components/core/providers/use-ctw";
import { toggleRead } from "@/fhir/basic";
import { FHIRModel } from "@/fhir/models/fhir-model";
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
 * This hook is toggles the read status for the specified FHIR model.
 *
 * @param queriesToInvalidate  Queries to refetch
 */
export function useToggleRead(...queriesToInvalidate: string[]): UseToggleReadResult {
  const { getRequestContext } = useCTW();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleRead = useCallback(async (model: FHIRModel<fhir4.Resource>) => {
    setIsLoading(true);
    await toggleRead(model, await getRequestContext());
    await Promise.all(
      queriesToInvalidate.map((queryToInvalidate) =>
        queryClient.invalidateQueries([queryToInvalidate])
      )
    );

    // Timeout here fixes bug where we would briefly flash
    // the old read/restore text.
    setTimeout(() => setIsLoading(false), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    toggleRead: handleToggleRead,
    isLoading,
  };
}
