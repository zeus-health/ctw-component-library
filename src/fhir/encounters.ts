import { getIncludedBasics } from "./bundle";
import { PatientModel } from "./models";
import { EncounterModel } from "./models/encounter";
import { searchCommonRecords } from "./search-helpers";
import { useFeatureFlaggedQueryWithPatient } from "..";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient } from "@/services/fqs/client";
import { EncounterGraphqlResponse, encountersQuery } from "@/services/fqs/queries/encounters";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientEncounters() {
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [],
    "encounters",
    "req.timing.encounters",
    getEncountersFromFQS,
    getEncountersFromODS
  );
}

function setupEncounterModels(
  resources: fhir4.Encounter[],
  bundle?: fhir4.Bundle
): EncounterModel[] {
  if (bundle) {
    const basicsMap = getIncludedBasics(bundle);
    return resources.map((c) => new EncounterModel(c, undefined, basicsMap.get(c.id ?? "")));
  }
  return resources.map((c) => new EncounterModel(c));
}

async function getEncountersFromFQS(requestContext: CTWRequestContext, patient: PatientModel) {
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
    const results = setupEncounterModels(nodes);
    if (results.length === 0) {
      Telemetry.countMetric("req.count.encounters.none", 0, ["fqs"]);
    }
    Telemetry.histogramMetric("req.count.encounters", results.length, ["fqs"]);
    return results;
  } catch (e) {
    Telemetry.logError(e as Error, "Failed fetching encounter timeline information for patient");
    throw new Error(`Failed fetching encounter timeline information for patient: ${e}`);
  }
}

async function getEncountersFromODS(requestContext: CTWRequestContext, patient: PatientModel) {
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
}
