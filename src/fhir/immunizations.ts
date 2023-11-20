import { PatientModel } from "./models";
import { ImmunizationModel } from "./models/immunization";
import { useQueryWithPatient } from "..";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
  ImmunizationWithBasics,
} from "@/services/fqs/queries/immunizations";
import { orderBy, uniqBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { sort } from "@/utils/sort";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientImmunizations(enabled = true) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    withTimerMetric(getImmunizationFromFQS, "req.timing.immunizations"),
    enabled
  );
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
    const results = getFilteredImmunizations(nodes, requestContext.builderId);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}

export const getFilteredImmunizations = (data: ImmunizationWithBasics[], builderId: string) => {
  const immunizations = data.map(
    (immunization) => new ImmunizationModel(immunization, undefined, immunization.BasicList)
  );

  const sortedByDate = sort(
    immunizations.filter((x) => x.status === "Completed"),
    "occurrence",
    "desc",
    true
  );

  // Bump builder owned allergies to the front, so uniqBy favors them!
  const builderOwnedFirst = orderBy(sortedByDate, (a) => a.ownedByBuilder(builderId), "desc");
  return uniqBy(builderOwnedFirst, "uniqueKey");
};
