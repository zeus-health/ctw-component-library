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
  query MedicationRequests(
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
          extension {
            url
            valueString
          }
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
          dispenseRequest {
            performer {
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
            numberOfRepeatsAllowed
            initialFill {
              quantity {
                value
                unit
              }
            }
          }
          dosageInstruction {
            text
            timing {
              repeat {
                boundsPeriod {
                  start
                }
              }
            }
          }
          medicationCodeableConcept {
            text
            coding {
              ...Coding
            }
          }
          performer {
            ...Reference
          }
          requester {
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
          status
        }
      }
    }
  }
`;
