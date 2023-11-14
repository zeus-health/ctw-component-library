import { SearchParams } from "fhir-kit-client";
import { useEffect, useState } from "react";
import { useIncludeBasics } from "./basic";
import { getIncludedResources } from "./bundle";
import { usePatientDocuments } from "./document";
import { PatientModel } from "./models";
import { EncounterModel } from "./models/encounter";
import { searchEncounterBuilderRecords } from "./search-helpers";
import { useQueryWithPatient } from "..";
import { dedupeAndMergeEncounters } from "@/components/content/encounters/helpers/filters";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { createGraphqlClient, fqsRequest, MAX_OBJECTS_PER_REQUEST } from "@/services/fqs/client";
import { EncounterGraphqlResponse, encountersQuery } from "@/services/fqs/queries/encounters";
import { errorResponse } from "@/utils/errors";
import { compact, pickBy } from "@/utils/nodash";
import { QUERY_KEY_PATIENT_ENCOUNTERS } from "@/utils/query-keys";
import { Telemetry, withTimerMetric } from "@/utils/telemetry";

function getEncountersFromFQS(limit: number) {
  return async (requestContext: CTWRequestContext, patient: PatientModel) => {
    try {
      const graphClient = createGraphqlClient(requestContext);
      const { data } = await fqsRequest<EncounterGraphqlResponse>(graphClient, encountersQuery, {
        upid: patient.UPID,
        cursor: "",
        first: limit,
        sort: {
          lastUpdated: "DESC",
        },
      });
      const nodes = data.EncounterConnection.edges.map((x) => x.node);
      const results = nodes.map((c) => new EncounterModel(c, c.ProvenanceList));
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

export function usePatientEncounters(limit = MAX_OBJECTS_PER_REQUEST, enabled = true) {
  const patientEncountersQuery = useQueryWithPatient(
    QUERY_KEY_PATIENT_ENCOUNTERS,
    [limit],
    withTimerMetric(getEncountersFromFQS(limit), `req.timing.encounters`),
    enabled
  );
  return useIncludeBasics(patientEncountersQuery);
}

// Gets patient encounters along with clinical notes from any documents associated with each encounter.
export function usePatientEncountersWithClinicalNotes(limit = MAX_OBJECTS_PER_REQUEST) {
  const documentsQuery = usePatientDocuments();
  const encounterQuery = usePatientEncounters(limit);
  const [encountersWithClinicalNotes, setEncountersWithClinicalNotes] = useState<EncounterModel[]>(
    []
  );

  useEffect(() => {
    const documents = documentsQuery.data;
    const encounters = encounterQuery.data;

    if (documents.length > 0) {
      setEncountersWithClinicalNotes(
        encounters.map((encounter) => {
          const model = new EncounterModel(
            encounter.resource,
            encounter.provenance,
            undefined,
            encounter.revIncludes
          );
          model.findAndSetNotesFrom(documents);
          return model;
        })
      );
    } else {
      setEncountersWithClinicalNotes(encounters);
    }
  }, [documentsQuery.data, encounterQuery.data]);

  const isLoading = documentsQuery.isLoading || encounterQuery.isLoading;
  const isError = documentsQuery.isError || encounterQuery.isError;
  const isFetching = documentsQuery.isFetching || encounterQuery.isFetching;

  return {
    isLoading,
    isError,
    isFetching,
    data: encountersWithClinicalNotes,
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
