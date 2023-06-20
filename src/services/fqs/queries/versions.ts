import { gql } from "graphql-request";
import { fragmentCondition } from "./fragments/condition";
import { ResourceTypeString } from "@/fhir/types";

export function versionsQuery(resourceType: ResourceTypeString, resourceIds: string[]) {
  console.log("resourceIds", resourceIds);
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
      return fragmentCondition;
    // case "AllergyIntolerance":
    //   return fragmentAllergy;
    default:
      return "";
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
