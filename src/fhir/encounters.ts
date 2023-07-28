import { getIncludedBasics } from "./bundle";
import { usePatientDocuments } from "./document";
import { PatientModel } from "./models";
import { DocumentModel } from "./models/document";
import { EncounterModel } from "./models/encounter";
import { searchCommonRecords } from "./search-helpers";
import { useFeatureFlaggedQueryWithPatient } from "..";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  EncounterGraphqlResponse,
  encountersQuery,
  EncounterWithProvenance,
} from "@/services/fqs/queries/encounters";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";
import { Telemetry } from "@/utils/telemetry";

export function usePatientEncounters() {
  const { data } = usePatientDocuments();
  return useFeatureFlaggedQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [data],
    "encounters",
    "req.timing.encounters",
    getEncountersFromFQS(data),
    getEncountersFromODS(data)
  );
}

function setupEncounterModels(
  resources: EncounterWithProvenance[],
  documents: DocumentModel[],
  bundle?: fhir4.Bundle
): EncounterModel[] {
  if (bundle) {
    const basicsMap = getIncludedBasics(bundle);
    return resources.map(
      (c) =>
        new EncounterModel(c, c.ProvenanceList, documents, undefined, basicsMap.get(c.id ?? ""))
    );
  }
  return resources.map((c) => new EncounterModel(c, c.ProvenanceList, documents));
}

function getEncountersFromFQS(documents: DocumentModel[]) {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const graphClient = createGraphqlClient(requestContext);
      const { data } = await fqsRequest<EncounterGraphqlResponse>(graphClient, encountersQuery, {
        upid: patient.UPID,
        cursor: "",
        first: 1000,
        sort: {
          lastUpdated: "DESC",
        },
      });
      const nodes = data.EncounterConnection.edges.map((x) => x.node);
      const results = setupEncounterModels(nodes, documents);
      if (results.length === 0) {
        Telemetry.countMetric("req.count.encounters.none", 1, ["fqs"]);
      }
      Telemetry.histogramMetric("req.count.encounters", results.length, ["fqs"]);
      return results;
    } catch (e) {
      Telemetry.logError(e as Error, "Failed fetching encounter timeline information for patient");
      throw new Error(`Failed fetching encounter timeline information for patient: ${e}`);
    }
  };
}

function getEncountersFromODS(documents: DocumentModel[]) {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const { bundle, resources: encounters } = await searchCommonRecords(
        "Encounter",
        requestContext,
        {
          patientUPID: patient.UPID,
        }
      );
      const results = setupEncounterModels(
        encounters as EncounterWithProvenance[],
        documents,
        bundle
      );
      if (results.length === 0) {
        Telemetry.countMetric("req.count.encounters.none");
      }
      Telemetry.histogramMetric("req.count.encounters", results.length);
      return results;
    } catch (e) {
      Telemetry.logError(e as Error, "Failed fetching timeline information for patient");
      throw new Error(`Failed fetching timeline information for patient: ${e}`);
    }
  };
}
