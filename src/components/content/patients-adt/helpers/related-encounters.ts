import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { EncounterModel } from "@/fhir/models";
import { createGraphqlClient, fqsRequest } from "@/services/fqs/client";
import { EncounterGraphqlResponse, encountersQuery } from "@/services/fqs/queries/encounters";
import { cloneDeep } from "@/utils/nodash";
import { QUERY_KEY_ENCOUNTERS_RELATED } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

// Cache related encounters and notes for 10 minutes.
const RELATED_ENC_STALE_TIME = 1000 * 60 * 10;

export type RelatedEncounter = {
  upid: string;
  cwcqEncounterId: string;
  binaryId: string;
};

export type RelatedEncounterMap = Map<string, RelatedEncounter>;

// Produces a copy of the encounters, but with the related encounter and notes assigned.
export async function mapEncountersAndNotes(
  adtEncounters: EncounterModel[],
  encounterAndNotesData: RelatedEncounterMap,
  getRequestContext: () => Promise<CTWRequestContext>
): Promise<EncounterModel[]> {
  const encountersToBeRelated: EncounterModel[] = [];
  const encountersWithoutRelated: EncounterModel[] = [];
  const relatedEncounterPromises = [];

  for (const encounter of adtEncounters) {
    if (encounterAndNotesData.has(encounter.resource.id ?? "")) {
      const encAndNote = encounterAndNotesData.get(encounter.resource.id ?? "");
      if (encAndNote) {
        encountersToBeRelated.push(cloneDeep(encounter));
        relatedEncounterPromises.push(fetchQueryRelatedEncounter(encAndNote, getRequestContext));
      }
    } else {
      encountersWithoutRelated.push(encounter);
    }
  }

  const graphQlResponses = await Promise.all(relatedEncounterPromises);
  const encounterNodes = graphQlResponses
    .map((r) => r.data.EncounterConnection.edges.map((x) => x.node))
    .flat();
  const encountersRelated = encountersToBeRelated.map((encounterWithRelated, index) => {
    // Reference enc & note
    const newEncounter = cloneDeep(encounterWithRelated);
    const encounterNode = encounterNodes[index];
    newEncounter.relatedEncounter = new EncounterModel(encounterNode, encounterNode.ProvenanceList);
    const encAndNote = encounterAndNotesData.get(encounterWithRelated.resource.id ?? "");
    if (encAndNote) {
      newEncounter.relatedEncounter.binaryId = encAndNote.binaryId.replaceAll('"', "");
    }
    return newEncounter;
  });

  return [...encountersRelated, ...encountersWithoutRelated];
}

async function fetchRelatedEncounter(
  encAndNote: RelatedEncounter,
  getRequestContext: () => Promise<CTWRequestContext>
) {
  const requestContext = await getRequestContext();
  const graphClient = createGraphqlClient(requestContext);
  return fqsRequest<EncounterGraphqlResponse>(graphClient, encountersQuery, {
    upid: encAndNote.upid,
    cursor: "",
    first: 1,
    sort: {
      lastUpdated: "DESC",
    },
    filter: {
      ids: {
        anymatch: [encAndNote.cwcqEncounterId],
      },
    },
  });
}

async function fetchQueryRelatedEncounter(
  encAndNote: RelatedEncounter,
  getRequestContext: () => Promise<CTWRequestContext>
) {
  return queryClient.fetchQuery(
    [QUERY_KEY_ENCOUNTERS_RELATED, encAndNote.cwcqEncounterId],
    async () => fetchRelatedEncounter(encAndNote, getRequestContext),
    { staleTime: RELATED_ENC_STALE_TIME }
  );
}
