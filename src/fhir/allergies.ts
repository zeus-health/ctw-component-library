import { getIncludedResources } from "./bundle";
import { PatientModel } from "./models";
import { searchCommonRecords } from "./search-helpers";
import {
  applyAllergyFilters,
  applyAllergyFiltersFQS,
} from "@/components/content/allergies/helpers/allergies-filter";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { createGraphqlClient } from "@/services/fqs/client";
import { AllergyGraphqlResponse, allergyQuery } from "@/services/fqs/queries/allergies";
import { QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientAllergies(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ALLERGIES,
    [],
    enableFQS
      ? withTimerMetric(
          async (requestContext, patient) => getAllergyIntoleranceFromFQS(requestContext, patient),
          "req.timing.allergies",
          ["FQS"]
        )
      : withTimerMetric(
          async (requestContext, patient) => getAllergyIntoleranceFromODS(requestContext, patient),
          "req.timing.allergies"
        )
  );
}

async function getAllergyIntoleranceFromFQS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const graphClient = createGraphqlClient(requestContext);
    const data = (await graphClient.request(allergyQuery, {
      upid: patient.UPID,
      cursor: "",
      first: 1000,
      sort: {
        lastUpdated: "DESC",
      },
    })) as AllergyGraphqlResponse;

    const nodes = data.AllergyIntoleranceConnection.edges.map((x) => x.node);
    const results = applyAllergyFiltersFQS(nodes);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none", 0, ["FQS"]);
    }
    Telemetry.histogramMetric("req.count.allergies", results.length, ["FQS"]);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}

async function getAllergyIntoleranceFromODS(
  requestContext: CTWRequestContext,
  patient: PatientModel
) {
  try {
    const { bundle, resources } = await searchCommonRecords("AllergyIntolerance", requestContext, {
      patientUPID: patient.UPID,
      _include: ["AllergyIntolerance:patient"],
      "_include:iterate": "Patient:organization",
    });

    const includedResources = getIncludedResources(bundle);
    const results = applyAllergyFilters(resources, includedResources);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.allergies.none");
    }
    Telemetry.histogramMetric("req.count.allergies", results.length);
    return results;
  } catch (e) {
    throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
  }
}
