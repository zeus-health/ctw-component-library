import { PatientModel } from "./models";
import { CTWRequestContext, useQueryWithPatient } from "..";
import { applyMedDispenseFilters } from "@/components/content/medication-dispense/helpers/filters";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  MedicationDispenseGraphqlResponse,
  medicationDispenseQuery,
} from "@/services/fqs/queries/medication-dispense";
import { QUERY_KEY_PATIENT_MEDICATION_DISPENSE } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientMedicationDispense() {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_MEDICATION_DISPENSE,
    [],
    withTimerMetric(getMedicationDispenseFromFQS, "req.timing.medication-dispense")
  );
}

async function getMedicationDispenseFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<MedicationDispenseGraphqlResponse>(
      graphClient,
      medicationDispenseQuery,
      {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
        filter: {},
      }
    );

    const nodes = data.MedicationDispenseConnection.edges.map((x) => x.node);
    return applyMedDispenseFilters(nodes);
  } catch (e) {
    throw Telemetry.logError(
      e as Error,
      `Failed fetching medication dispenses for patient: ${patient.UPID}`
    );
  }
}
