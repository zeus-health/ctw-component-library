import { gql } from "graphql-request";
import { fragmentCondition } from "./fragments/condition";
import { ResourceTypeString } from "@/fhir/types";

export function versionsQuery(resourceType: ResourceTypeString, resourceIds: string[]) {
  const fragment = getResourceFragment(resourceType);

  const queries = resourceIds
    .map((resourceId) => createHistoryQuery(resourceType, resourceId))
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
      return fragmentCondition;
    default:
      return "";
  }
}

function createHistoryQuery(resourceType: ResourceTypeString, resourceId: string) {
  return `
      ${resourceType}(
        id: "${resourceId}"
      ) {          
        ...${resourceType}
      }
  `;
}
