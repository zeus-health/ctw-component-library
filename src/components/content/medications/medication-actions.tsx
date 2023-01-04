import type { MedicationStatementModel } from "@/fhir/models";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { recordProfileAction } from "@/fhir/basic";
import { QUERY_KEY_OTHER_PROVIDER_MEDICATIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export const handleMedicationDismissal = async (
  medication: MedicationStatementModel,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const requestContext = await getRequestContext();
  const existingBasic = medication.getBasicResourceByAction("archive");

  await recordProfileAction(
    existingBasic,
    medication,
    requestContext,
    "archive"
  );

  // Invalidate related queries
  await queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_MEDICATIONS]);
};
