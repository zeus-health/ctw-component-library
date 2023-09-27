import { Observation } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentObservation } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ObservationConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Observation>[];
}

export interface ObservationGraphqlResponse {
  ObservationConnection: ObservationConnection;
}

export const observationQuery = gql`
  ${fragmentObservation}

  query Observations(
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
          ...Observation
        }
      }
    }
  }
`;
