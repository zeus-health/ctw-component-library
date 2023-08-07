import { Provenance } from "fhir/r4";
import { gql } from "graphql-request";
import { createGraphqlClient } from "../client";
import { CTWRequestContext } from "@/components/core/providers/ctw-context";
import { ResourceTypeString } from "@/fhir/types";
import { QUERY_KEY_PROVENANCE } from "@/utils/query-keys";
import { queryClient } from "@/utils/request";

export async function searchProvenancesFQS(
  requestContext: CTWRequestContext,
  resourceType: ResourceTypeString,
  targets: string[]
) {
  const targetIds = targets.map((target) => target.replace(`${resourceType}/`, ""));
  const graphClient = createGraphqlClient(requestContext);

  return queryClient.fetchQuery([QUERY_KEY_PROVENANCE, resourceType, targetIds], async () => {
    const data = (await graphClient.request(
      provenanceQueries(resourceType, targetIds)
    )) as ProvenanceResponse;

    return Object.values(data).reduce((acc, val) => {
      acc.push(...val.ProvenanceList);
      return acc;
    }, [] as Provenance[]);
  });
}

type ProvenanceResponse = {
  [key: string]: {
    ProvenanceList: Provenance[];
  };
};

function provenanceQueries(resourceType: ResourceTypeString, targetIds: string[]) {
  return gql`
    query GetProvenances() {
      ${targetIds.map((id, index) => provenanceQuery(resourceType, id, index)).join("\n")}
    }
  `;
}

function provenanceQuery(resourceType: ResourceTypeString, targetId: string, index: number) {
  return `
    provenance${index}: ${resourceType}(id: "${targetId}") {
      ProvenanceList(_reference: "target") {
        id
        meta {
          tag {
            system
            code
          }
        }
        target {
          reference
        }
        entity {
          role
          what {
            reference
          }
        }
      }
    }
  `;
}
