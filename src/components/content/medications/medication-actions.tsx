import type { MedicationStatementModel } from "@/fhir/models";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { recordProfileAction } from "@/fhir/basic";
import { invalidateOtherProviderMedsQueries } from "@/utils/invalidate-queries";

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
  await invalidateOtherProviderMedsQueries();
};
