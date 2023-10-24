import { useIncludePatientBasics } from "./basic";
import { AllergyModel, PatientModel } from "./models";
import { applyAllergyFilters } from "@/components/content/allergies/helpers/allergies-filter";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { AllergyGraphqlResponse, allergyQuery } from "@/services/fqs/queries/allergies";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientAllergies() {
  const patientAllergiesQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    withTimerMetric(getAllergyIntoleranceFromFQS, "req.timing.allergies")
  );

  return useIncludePatientBasics(patientAllergiesQuery);
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
    const models = data.AllergyIntoleranceConnection.edges.map((x) => new AllergyModel(x.node));
    const results = applyAllergyFilters(models, requestContext.builderId);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none", 1);
    }
    Telemetry.histogramMetric("req.count.allergies", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}

export async function getAllergyIntolerancesById(
  requestContext: CTWRequestContext,
  patient: PatientModel,
  ids: string[]
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const { data } = await fqsRequest<AllergyGraphqlResponse>(graphClient, allergyQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 500,
      filter: {
        ids: {
          anymatch: ids,
        },
      },
      sort: {},
    });
    return data.AllergyIntoleranceConnection.edges.map((x) => new AllergyModel(x.node));
  } catch (e) {
    throw new Error(`Failed fetching allergies by ID for patient ${patient.UPID}`);
  }
}
