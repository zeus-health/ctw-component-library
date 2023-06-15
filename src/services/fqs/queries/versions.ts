import { gql } from "graphql-request";
import { fragmentCondition } from "./fragments/condition";
import { ResourceTypeString } from "@/fhir/types";

export function versionsQuery(resourceType: ResourceTypeString, resourceId: string[]) {
  const fragment = getResourceFragment(resourceType);

  return gql`
    ${fragment}

    query getHistory {
      ${resourceType}History(
        id: "${resourceId}"
      ) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            ...${resourceType}
          }
        }
      }
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

function createHistoryQuery();
