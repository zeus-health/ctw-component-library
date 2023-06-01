import { getIncludedResources } from "./bundle";
import { CodePreference } from "./codeable-concept";
import { AllergyModel } from "./models/allergies";
import { searchCommonRecords } from "./search-helpers";
import {
  SYSTEM_NDC,
  SYSTEM_RXNORM,
  SYSTEM_SNOMED,
  SYSTEM_SUMMARY,
  SYSTEM_ZUS_THIRD_PARTY,
} from "./system-urls";
import { applyAllergyFilters } from "@/components/content/allergies/allergies-filter";
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
      ? withTimerMetric(async (requestContext, patient) => {
          try {
            const graphClient = createGraphqlClient(requestContext);
            const data = (await graphClient.request(allergyQuery, {
              upid: patient.UPID,
              cursor: "",
              first: 1000,
              sort: {
                lastUpdated: "DESC",
              },
              filter: {
                tag: {
                  nonematch: [SYSTEM_SUMMARY, `${SYSTEM_ZUS_THIRD_PARTY}`],
                },
              },
            })) as AllergyGraphqlResponse;

            const nodes = data.AllergyConnection.edges.map((x) => x.node);
            // TODO: No longer needed once https://zeushealth.atlassian.net/browse/DRT-249 is resolved.

            const allergies = setupAllergyModelsWithFQS(nodes);

            if (allergies.length === 0) {
              Telemetry.countMetric("req.count.allergies.none");
            }
            Telemetry.histogramMetric("req.count.allergies", allergies.length);
            return allergies;
          } catch (e) {
            throw new Error(`Failed fetching allergies information for patient ${patient.UPID}`);
          }
        }, "req.timing.allergies")
      : withTimerMetric(async (requestContext, patient) => {
          try {
            const { bundle, resources } = await searchCommonRecords(
              "AllergyIntolerance",
              requestContext,
              {
                patientUPID: patient.UPID,
                _include: ["AllergyIntolerance:patient"],
                "_include:iterate": "Patient:organization",
              }
            );

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
        }, "req.timing.allergies")
  );
}

export const ALLERGY_CODE_PREFERENCE_ORDER: CodePreference[] = [
  { system: SYSTEM_RXNORM },
  { system: SYSTEM_NDC },
  { system: SYSTEM_SNOMED },
];

function setupAllergyModelsWithFQS(allergyResources: fhir4.AllergyIntolerance[]): AllergyModel[] {
  return allergyResources.map((c) => new AllergyModel(c));
}
