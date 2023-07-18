import { Observation } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ObservationConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Observation>[];
}

export interface ObservationGraphqlResponse {
  ObservationConnection: ObservationConnection;
}

export const observationQuery = gql`
  ${fragmentCoding}
  query ObservationConnection(
    $upid: ID!
    $cursor: String!
    $sort: ObservationSortParams!
    $filter: ObservationFilterParams!
    $first: Int!
  ) {
    ObservationConnection(
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
          interpretation {
            text
            coding {
              ...Coding
            }
          }
          code {
            text
            coding {
              ...Coding
            }
          }
          effectiveDateTime
          effectivePeriod {
            start
            end
          }
          valueCodeableConcept {
            text
            coding {
              ...Coding
            }
          }
          valueQuantity {
            value
            unit
          }
          valueString
        }
      }
    }
  }
`;
