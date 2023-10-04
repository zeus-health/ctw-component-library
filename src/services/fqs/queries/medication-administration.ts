import { MedicationAdministration } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface MedicationAdministrationConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<MedicationAdministration>[];
}

export interface MedicationAdministrationGraphqlResponse {
  MedicationAdministrationConnection: MedicationAdministrationConnection;
}

export const medicationAdministrationQuery = gql`
  ${fragmentCoding}
  query MedicationAdministrations(
    $upid: ID!
    $cursor: String!
    $filter: MedicationAdministrationFilterParams!
    $sort: MedicationAdministrationSortParams!
    $first: Int!
  ) {
    MedicationAdministrationConnection(
      upid: $upid
      after: $cursor
      filter: $filter
      sort: $sort
      first: $first
    ) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          resourceType
          extension {
            url
            valueString
          }
          dosage {
            text
            dose {
              value
              unit
            }
            route {
              text
              coding {
                ...Coding
              }
            }
          }
          effectivePeriod {
            start
            end
          }
        }
      }
    }
  }
`;
