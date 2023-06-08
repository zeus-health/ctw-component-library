import { Encounter } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentLocation } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface EncounterConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Encounter>[];
}

export interface EncounterGraphqlResponse {
  EncounterConnection: EncounterConnection;
}

export const encountersQuery = gql`
  ${fragmentCoding}
  ${fragmentLocation}
  query Encounters($upid: ID!, $cursor: String!, $sort: EncounterSortParams!, $first: Int!) {
    EncounterConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          resourceType
          meta {
            tag {
              system
              code
            }
            versionId
          }
          status
          class {
            system
            version
            code
            display
          }
          type {
            text
            coding {
              ...Coding
            }
          }
          serviceType {
            text
            coding {
              ...Coding
            }
          }
          priority {
            text
            coding {
              ...Coding
            }
          }
          diagnosis {
            condition {
              reference
              resource {
                id
                resourceType
                code {
                  coding {
                    ...Coding
                  }
                }
                text
              }
            }
          participant {
            type {
              text
              coding {
                ...Coding
              }
            }
            period {
              start
              end
            }
          }
          period {
            start
            end
          }
          length {
            value
            unit
          }
          reasonCode {
            text
            coding {
              ...Coding
            }
          }
          location {
            location {
              reference
              resource {
                ...Location
              }
            }
            status
            period {
              start
              end
            }
          }
        }
      }
    }
  }
`;
