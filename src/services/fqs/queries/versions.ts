import { gql } from "graphql-request";
import { fragmentCondition } from "./fragments/condition";
import { ResourceTypeString } from "@/fhir/types";

export function versionsQuery(resourceType: ResourceTypeString, resourceIds: string[]) {
  const fragment = getResourceFragment(resourceType);

  const megaquery = "";

  resourceIds.map((resourceId) =>
    megaquery.concat(createHistoryQuery(fragment, resourceType, resourceId))
  );

  return gql`
    query getHistory {
      ${megaquery}
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

function createHistoryQuery(
  fragment: string,
  resourceType: ResourceTypeString,
  resourceId: string
) {
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
