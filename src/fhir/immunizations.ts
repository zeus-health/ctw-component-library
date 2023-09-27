import { useIncludeBasics } from "./basic";
import { PatientModel } from "./models";
import { useQueryWithPatient } from "..";
import { applyImmunizationFilters } from "@/components/content/immunizations/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
} from "@/services/fqs/queries/immunizations";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientImmunizations() {
  const patientImmunizationsQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    withTimerMetric(getImmunizationFromFQS, "req.timing.immunizations")
  );

  return useIncludeBasics(patientImmunizationsQuery);
}

async function getImmunizationFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<ImmunizationGraphqlResponse>(
      graphClient,
      immunizationsQuery,
      {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
      }
    );
    const nodes = data.ImmunizationConnection.edges.map((x) => x.node);
    const results = applyImmunizationFilters(nodes, requestContext.builderId);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}
