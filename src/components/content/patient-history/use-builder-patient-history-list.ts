import { getBuilderRefreshHistoryMessages } from "./use-patient-history";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";
import { PatientHistoryRequestModel } from "@/fhir/models/patient-history";
import { getBuilderPatientsListByIdentifier } from "@/fhir/patient-helper";
import { PatientHistoryResponse } from "@/services/patient-history/patient-history-types";
import { compact, uniq } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_HISTORY_LIST } from "@/utils/query-keys";
import { sort } from "@/utils/sort";
import { Telemetry } from "@/utils/telemetry";

export function useBuilderPatientHistoryList(pageSize: number, pageOffset: number) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENT_HISTORY_LIST,
    [pageSize, pageOffset],
    async (requestContext) => {
      try {
        const response = (await getBuilderRefreshHistoryMessages(
          requestContext
        )) as PatientHistoryResponse;

        const start = pageOffset * pageSize;
        const end = start + pageSize;
        const patientHistoryRequests = sort(response.data, "_createdAt", "desc", true).slice(
          start,
          end
        );

        const patientsIds = uniq(
          compact(patientHistoryRequests.map((message) => message.initialData.patientId))
        );

        if (!patientsIds.length) {
          return { total: 0, patients: [] };
        }

        const patientData = await getBuilderPatientsListByIdentifier(
          requestContext,
          undefined,
          patientsIds
        );

        const patientHistoryRequestsWithPatientData = compact(
          patientHistoryRequests.map((m) => {
            const matchingPatient = patientData.patients.find(
              (p) => p.id === m.initialData.patientId
            );
            return matchingPatient ? new PatientHistoryRequestModel(matchingPatient, m) : undefined;
          })
        );

        return {
          total: response.data.length,
          patients: patientHistoryRequestsWithPatientData,
        };
      } catch (e) {
        Telemetry.logError(e as Error, "Failed fetching patient history patients.");
        throw new Error(`Failed fetching patient history patients: ${e}`);
      }
    }
  );
}
