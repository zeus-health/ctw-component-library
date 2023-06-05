import { getIncludedBasics } from "./bundle";
import { EncounterModel } from "./models/encounter";
import { searchCommonRecords } from "./search-helpers";
import { useQueryWithPatient } from "@/components/core/providers/patient-provider";
import { createGraphqlClient } from "@/services/fqs/client";
import { EncounterGraphqlResponse, encountersQuery } from "@/services/fqs/queries/encounters";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientEncounters(enableFQS: boolean) {
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [],
    enableFQS
      ? withTimerMetric(async (requestContext, patient) => {
          try {
            const graphClient = createGraphqlClient(requestContext);
            const data = (await graphClient.request(encountersQuery, {
              upid: patient.UPID,
              cursor: "",
              first: 1000,
              sort: {
                lastUpdated: "DESC",
              },
            })) as EncounterGraphqlResponse;
            const nodes = data.EncounterConnection.edges.map((x) => x.node);
            const results = setupEncounterModelsFQS(nodes);
            if (results.length === 0) {
              Telemetry.countMetric("req.count.encounters.none");
            }
            Telemetry.histogramMetric("req.count.encounters", results.length);
            return results;
          } catch (e) {
            Telemetry.logError(e as Error, "Failed fetching timeline information for patient");
            throw new Error(`Failed fetching timeline information for patient: ${e}`);
          }
        }, "req.timing.encounters")
      : withTimerMetric(async (requestContext, patient) => {
          try {
            const { bundle, resources: encounters } = await searchCommonRecords(
              "Encounter",
              requestContext,
              {
                patientUPID: patient.UPID,
              }
            );
            const results = setupEncounterModels(encounters, bundle);
            if (results.length === 0) {
              Telemetry.countMetric("req.count.encounters.none");
            }
            Telemetry.histogramMetric("req.count.encounters", results.length);
            return results;
          } catch (e) {
            Telemetry.logError(e as Error, "Failed fetching timeline information for patient");
            throw new Error(`Failed fetching timeline information for patient: ${e}`);
          }
        }, "req.timing.encounters")
  );
}
function setupEncounterModels(
  resources: fhir4.Encounter[],
  bundle: fhir4.Bundle
): EncounterModel[] {
  const basicsMap = getIncludedBasics(bundle);
  return resources.map((c) => new EncounterModel(c, undefined, basicsMap.get(c.id ?? "")));
}

function setupEncounterModelsFQS(resources: fhir4.Encounter[]): EncounterModel[] {
  return resources.map((c) => new EncounterModel(c));
}
