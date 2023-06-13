import { MedicationRequest } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentReference } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface MedicationRequestConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<MedicationRequest>[];
}

export interface MedicationRequestGraphqlResponse {
  MedicationRequestConnection: MedicationRequestConnection;
}

export const medicationRequestQuery = gql`
  ${fragmentCoding}
  ${fragmentReference}
  query MedicationRequest(
    $upid: ID!
    $cursor: String!
    $filter: MedicationRequestFilterParams!
    $sort: MedicationRequestSortParams!
    $first: Int!
  ) {
    MedicationRequestConnection(
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
          authoredOn
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
              ... on Organization {
                id
                resourceType
                oragnizationName: name
                telecom {
                  value
                }
                address {
                  city
                  state
                  postalCode
                  text
                  line
                }
              }
            }
          }
          dispenseRequest {
            performer {
              ...Reference
            }
          }
          medicationCodeableConcept {
            text
            coding {
              ...Coding
            }
          }
        }
      }
    }
  }
`;
