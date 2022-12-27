import type { MedicationStatementModel } from "@/fhir/models";
import { CTWRequestContext } from "@/components/core/ctw-context";
import { recordProfileAction } from "@/fhir/basic";
import { QUERY_KEY_OTHER_PROVIDER_MEDICATIONS } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export const handleToggleDismissal = async (
  medication: MedicationStatementModel,
  getRequestContext: () => Promise<CTWRequestContext>
) => {
  const requestContext = await getRequestContext();
  const existingBasic =
    medication.getBasicResourceByAction("dismiss") ||
    medication.getBasicResourceByAction("retain");

  const profileAction = medication.isDismissed ? "retain" : "dismiss";

  await recordProfileAction(
    existingBasic,
    medication,
    requestContext,
    profileAction
  );

  // Invalidate related queries
  await queryClient.invalidateQueries([QUERY_KEY_OTHER_PROVIDER_MEDICATIONS]);
};
