import { getBuilderRefreshHistoryMessages } from "./use-patient-history";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { PatientHistorytModel } from "@/fhir/models/patient-history";
import { getBuilderPatientsListByIdentifier } from "@/fhir/patient-helper";
import { PatientRefreshHistoryMessage } from "@/services/patient-history/patient-history-types";
import { compact, uniq } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_HISTORY_LIST } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function useBuilderPatientHistoryList(
  pageSize: number,
  pageOffset: number
) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_HISTORY_LIST,
    [pageSize, pageOffset],
    async (requestContext) => {
      try {
        const messages = (
          await getBuilderRefreshHistoryMessages(requestContext)
        ).data as PatientRefreshHistoryMessage[];

        const start = pageOffset * pageSize;
        const end = start + pageSize;
        const subsetMessages = messages.slice(start, end);

        const patientsIds = uniq(
          compact(
            subsetMessages.map((message) => message.initialData.patientId)
          )
        );
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
          total: messages.length,
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
