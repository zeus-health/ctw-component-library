import {
  QUERY_KEY_MEDICATION_HISTORY,
  QUERY_KEY_OTHER_PROVIDER_MEDICATIONS,
  QUERY_KEY_PATIENT_BUILDER_MEDICATIONS,
} from "./query-keys";
import { queryClient } from "@/utils/request";

// Invalidate all queries
export const invalidateQueries = () => queryClient.invalidateQueries();

export const invalidateQueriesFrom = (queryKey: unknown[]) =>
  queryClient.invalidateQueries({ queryKey });

export function invalidateBuilderMedsQueries() {
  return invalidateQueriesFrom([QUERY_KEY_PATIENT_BUILDER_MEDICATIONS]);
}

export function invalidateOtherProviderMedsQueries() {
  return invalidateQueriesFrom([QUERY_KEY_OTHER_PROVIDER_MEDICATIONS]);
}

export function invalidateMedicationHistoryQueries() {
  return invalidateQueriesFrom([QUERY_KEY_MEDICATION_HISTORY]);
}

export function invalidateAllMedicationQueries() {
  return Promise.all([
    invalidateBuilderMedsQueries(),
    invalidateOtherProviderMedsQueries(),
    invalidateMedicationHistoryQueries(),
  ]);
}
