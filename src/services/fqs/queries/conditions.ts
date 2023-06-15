import { Condition } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCondition } from "./fragments/condition";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ConditionConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Condition>[];
}

export interface ConditionGraphqlResponse {
  ConditionConnection: ConditionConnection;
}

export const conditionsQuery = gql`
  ${fragmentCondition}
  query Conditions(
    $upid: ID!
    $cursor: String!
    $filter: ConditionFilterParams!
    $sort: ConditionSortParams!
    $first: Int!
  ) {
    ConditionConnection(upid: $upid, after: $cursor, filter: $filter, sort: $sort, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...Condition
        }
      }
    }
  }
`;
