import { gql } from "graphql-request";
import { fragmentConditionHistory } from "./fragments/condition";
import { ResourceTypeString } from "@/fhir/types";

export function versionsQuery(resourceType: ResourceTypeString, resourceIds: string[]) {
  const fragment = getResourceFragment(resourceType);

  const queries = resourceIds
    .map((resourceId, ind) => createHistoryQuery(resourceType, resourceId, ind))
    .join("\n");

  return gql`
  ${fragment}
    query historyQuery {
      ${queries}
    }
  `;
}

function getResourceFragment(resourceType: ResourceTypeString) {
  switch (resourceType) {
    case "Condition":
      return fragmentConditionHistory;
    default:
      throw new Error(`Resource type to FQS query not implemented yet for ${resourceType}`);
  }
}

function createHistoryQuery(resourceType: ResourceTypeString, resourceId: string, ind: number) {
  return `
    history${ind}: ${resourceType}History(
        id: "${resourceId}"
      ) {          
        ...${resourceType}
      }
  `;
}
