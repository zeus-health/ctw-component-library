import { PatientModel } from "./models";
import { searchCommonRecords } from "./search-helpers";
import { applyImmunizationFilters } from "@/components/content/immunizations/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { createGraphqlClient } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
} from "@/services/fqs/queries/immunizations";
import { orderBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientImmunizations() {
  const fqs = useFQSFeatureToggle("immunizations");
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [fqs.ready],
    (() => {
      if (!fqs.ready) {
        return async () => [];
      }
      return fqs.enabled
        ? withTimerMetric(
            async (requestContext, patient) => getImmunizationFromFQS(requestContext, patient),
            "req.timing.immunizations",
            ["fqs"]
          )
        : withTimerMetric(
            async (requestContext, patient) => getImmunizationFromODS(requestContext, patient),
            "req.timing.immunizations"
          );
    })()
  );
}

async function getImmunizationFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const data = (await graphClient.request(immunizationsQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    })) as ImmunizationGraphqlResponse;
    const nodes = data.ImmunizationConnection.edges.map((x) => x.node);
    const results = orderBy(
      applyImmunizationFilters(nodes),
      [(model) => model.occurrence ?? ""],
      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}

async function getImmunizationFromODS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const { resources: immunizations } = await searchCommonRecords("Immunization", requestContext, {
      patientUPID: patient.UPID,
    });
    const results = orderBy(
      applyImmunizationFilters(immunizations),
      [(model) => model.occurrence ?? ""],
      ["desc"]
    );
    if (results.length === 0) {
      Telemetry.countMetric("req.count.immunizations.none");
    }
    Telemetry.histogramMetric("req.count.immunizations", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching immunization information for patient: ${e}`);
  }
}
