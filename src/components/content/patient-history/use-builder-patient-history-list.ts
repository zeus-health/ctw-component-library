import { compact, uniq } from "@/utils/nodash";

import { getBuilderPatientsListByIdentifier } from "@/fhir/patient-helper";
import { getBuilderRefreshHistoryMessages } from "./use-patient-history";
import { PatientHistoryJobResponse } from "@/services/patient-history/patient-history-types";
import { QUERY_KEY_PATIENT_HISTORY_LIST } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";
import { useQueryWithCTW } from "@/components/core/providers/ctw-provider";

export function useBuilderPatientHistoryList(
  pageSize: number,
  pageOffset: number,
  status?: string
) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENT_HISTORY_LIST,
    [pageSize, pageOffset, status],
    async (requestContext) => {
      try {
        const response = (await getBuilderRefreshHistoryMessages({
          requestContext,
          count: pageSize,
          offset: pageOffset,
          status,
        })) as PatientHistoryJobResponse;

        const patientsIds = uniq(
          compact(response.data.map((job) => job.relationships.patient.data.id))
        );

        if (!patientsIds.length) {
          return { total: 0, patients: [] };
        }

        const patientData = await getBuilderPatientsListByIdentifier(
          requestContext,
          undefined,
          patientsIds
        );

        const patientHistoryPatients = response.data.map((job) => {
          const matchingPatient = patientData.patients.filter(
            (patient) => patient.id === job.relationships.patient.data.id
          );

          return new PatientHistorytModel(matchingPatient[0], job);
        });

        return {
          hasNext: !!response.links.next,
          total: response.data.length,
          patients: patientHistoryPatients,
        };
      } catch (e) {
        Telemetry.logError(e as Error, "Failed fetching patient history patients.");
        throw new Error(`Failed fetching patient history patients: ${e}`);
      }
    }
  );
}
