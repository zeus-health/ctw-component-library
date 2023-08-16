import { MedicationDispense } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding } from "./fragments";
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
          extension {
            url
            valueString
            valueInstant
          }
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
                _organization__name: name
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
          performer {
            actor {
              id
              extension {
                url
                valueString
              }
              reference
              type
              identifier {
                id
                system
                value
              }
              display
              resource {
                ... on Organization {
                  id
                  resourceType
                  name
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
