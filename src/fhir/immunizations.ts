import { useIncludeBasics } from "./basic";
import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { searchCommonRecords } from "./search-helpers";
import { useFeatureFlaggedQueryWithPatient } from "..";
import { applyImmunizationFilters } from "@/components/content/immunizations/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  ImmunizationGraphqlResponse,
  immunizationsQuery,
} from "@/services/fqs/queries/immunizations";
import { QUERY_KEY_PATIENT_IMMUNIZATIONS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientImmunizations() {
  const fqs = useFQSFeatureToggle("immunizations");

  const patientImmunizationsQuery = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_IMMUNIZATIONS,
    [],
    "immunizations",
    "req.timing.immunizations",
    getImmunizationFromFQS,
    getImmunizationFromODS
  );

  return useIncludeBasics(patientImmunizationsQuery, fqs);
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

async function getImmunizationFromODS(requestContext: CTWRequestContext, patient: PatientModel) {
  try {
    const { bundle, resources: immunizations } = await searchCommonRecords(
      "Immunization",
      requestContext,
      {
        patientUPID: patient.UPID,
      }
    );
    const includedResources = getIncludedResources(bundle);
    const results = applyImmunizationFilters(
      immunizations,
      requestContext.builderId,
      includedResources
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
