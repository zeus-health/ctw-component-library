import { SearchParams } from "fhir-kit-client";
import { getIncludedBasics, getIncludedResources } from "./bundle";
import { usePatientDocuments } from "./document";
import { PatientModel } from "./models";
import { DocumentModel } from "./models/document";
import { EncounterModel } from "./models/encounter";
import { searchEncounterBuilderRecords } from "./search-helpers";
import { useQueryWithPatient } from "..";
import { dedupeAndMergeEncounters } from "@/components/content/encounters/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import {
  EncounterGraphqlResponse,
  encountersQuery,
  EncounterWithProvenance,
} from "@/services/fqs/queries/encounters";
import { errorResponse } from "@/utils/errors";
import { compact, pickBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

export function usePatientEncounters() {
  const { data, isFetched } = usePatientDocuments();
  return useQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [data],
    (() => {
      if (!isFetched) {
        return async () => new Promise<EncounterModel[]>(() => {});
      }
      return withTimerMetric(getEncountersFromFQS(data), `req.timing.encounters`);
    })()
  );
}

function setupEncounterModels(
  resources: EncounterWithProvenance[],
  documents: DocumentModel[],
  bundle?: fhir4.Bundle
): EncounterModel[] {
  if (bundle) {
    const basicsMap = getIncludedBasics(bundle);
    return resources.map((c) => {
      const enc = new EncounterModel(c, c.ProvenanceList, undefined, basicsMap.get(c.id ?? ""));
      enc.documents = documents;
      return enc;
    });
  }
  return resources.map((c) => {
    const enc = new EncounterModel(c, c.ProvenanceList);
    enc.documents = documents;
    return enc;
  });
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
        Telemetry.countMetric("req.count.encounters.none", 1);
      }
      Telemetry.histogramMetric("req.count.encounters", results.length);
      return dedupeAndMergeEncounters(results, "patientEncounter");
    } catch (e) {
      Telemetry.logError(e as Error, "Failed fetching encounter timeline information for patient");
      throw new Error(`Failed fetching encounter timeline information for patient: ${e}`);
    }
  };
}

export async function getADTPatientsFromODS(requestContext: CTWRequestContext) {
  const searchParams = pickBy({
    _tag: "https://zusapi.com/thirdparty/source|bamboohealth,collective-medical",
    status: "in-progress",
    _include: "Encounter:patient",
  }) as SearchParams;

  try {
    const { resources, bundle } = await searchEncounterBuilderRecords(
      "Encounter",
      requestContext,
      searchParams
    ); // reosurces now have patients and encounters in it

    const includedResources = getIncludedResources(bundle);

    const encounterResources = resources.map((e) => new EncounterModel(e, [], undefined, []));

    const filteredResources = encounterResources.filter((e) => !!e.periodEnd);

    const encounterPatients = compact(
      filteredResources.map((e) =>
        e.resource.subject?.reference
          ? new PatientModel(includedResources[e.resource.subject.reference] as fhir4.Patient)
          : undefined
      )
    );

    const uniquePatients = Array.from(new Set(encounterPatients.map((p) => p.id))).map((id) =>
      encounterPatients.find((p) => p.id === id)
    );

    return uniquePatients as PatientModel[];
  } catch (e) {
    throw errorResponse("Failed fetching encounter alert information", e);
  }
}
