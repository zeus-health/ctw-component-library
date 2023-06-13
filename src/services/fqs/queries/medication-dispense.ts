import { MedicationDispense } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentReference } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface MedicationDispenseConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<MedicationDispense>[];
}

export interface MedicationDispenseGraphqlResponse {
  MedicationDispenseConnection: MedicationDispenseConnection;
}

export const medicationDispenseQuery = gql`
  ${fragmentCoding}
  ${fragmentReference}
  query MedicationDispense(
    $upid: ID!
    $cursor: String!
    $filter: MedicationDispenseFilterParams!
    $sort: MedicationDispenseSortParams!
    $first: Int!
  ) {
    MedicationDispenseConnection(
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
          contained {
            resource {
              ... on Practitioner {
                id
                resourceType
                name {
                  family
                  given
                }
                address {
                  text
                }
                telecom {
                  value
                }
              }
            }
          }
          performer {
            actor {
              ...Reference
            }
          }
          status
          quantity {
            value
            unit
          }
          medicationCodeableConcept {
            text
            coding {
              ...Coding
            }
          }
          daysSupply {
            value
            unit
          }
          whenHandedOver
          whenPrepared
        }
      }
    }
  }
`;
