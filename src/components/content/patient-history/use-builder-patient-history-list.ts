import { getBuilderRefreshHistoryMessages } from "./use-patient-history";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";
import { PatientHistorytModel } from "@/fhir/models/patient-history";
import { getBuilderPatientsListByIdentifier } from "@/fhir/patient-helper";
import { PatientHistoryResponse } from "@/services/patient-history/patient-history-types";
import { compact, uniq } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_HISTORY_LIST } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function useBuilderPatientHistoryList(
  pageSize: number,
  pageOffset: number
) {
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
        const subsetMessages = response.data.slice(start, end);

        const patientsIds = uniq(
          compact(
            subsetMessages.map((message) => message.initialData.patientId)
          )
        );

        if (!patientsIds.length) {
          return { total: 0, patients: [] };
        }

        const patientData = await getBuilderPatientsListByIdentifier(
          requestContext,
          undefined,
          patientsIds
        );

        const patientHistoryPatients = patientData.patients.map((patient) => {
          const matchingPatientId = subsetMessages.filter(
            (message) => message.initialData.patientId === patient.id
          );
          return new PatientHistorytModel(patient, matchingPatientId[0]);
        });

        return {
          total: response.data.length,
          patients: patientHistoryPatients,
        };
      } catch (e) {
        Telemetry.logError(
          e as Error,
          "Failed fetching patient history patients."
        );
        throw new Error(`Failed fetching patient history patients: ${e}`);
      }
    }
  );
}
