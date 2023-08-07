import { useIncludeBasics } from "./basic";
import { PatientModel } from "./models";
import { applyAllergyFilters } from "@/components/content/allergies/helpers/allergies-filter";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useFeatureFlaggedQueryWithPatient } from "@/components/core/providers/patient-provider";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { AllergyGraphqlResponse, allergyQuery } from "@/services/fqs/queries/allergies";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientAllergies() {
  const fqs = useFQSFeatureToggle("allergies");

  const patientAllergiesQuery = useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    "allergies",
    "req.timing.allergies",
    getAllergyIntoleranceFromFQS
  );

  return useIncludeBasics(patientAllergiesQuery, fqs);
}

async function getAllergyIntoleranceFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<AllergyGraphqlResponse>(graphClient, allergyQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    });
    const nodes = data.AllergyIntoleranceConnection.edges.map((x) => x.node);
    const results = applyAllergyFilters(nodes, requestContext.builderId);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none", 1, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.allergies", results.length, ["fqs"]);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}
