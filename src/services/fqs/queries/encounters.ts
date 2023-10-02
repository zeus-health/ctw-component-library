import { Encounter } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentEncounter } from "./fragments/encounter";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface EncounterConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<EncounterWithProvenance>[];
}

export type EncounterWithProvenance = Encounter & {
  ProvenanceList: fhir4.Provenance[];
};

export interface EncounterGraphqlResponse {
  EncounterConnection: EncounterConnection;
}

export const encountersQuery = gql`
  ${fragmentEncounter}

  query EncountersAll($upid: ID!, $cursor: String!, $sort: EncounterSortParams!, $first: Int!) {
    EncounterConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...Encounter
        }
      }
    }
  }
`;

export const encounterADTQuery = gql`
  query EncounterADTConnection($upid: ID!, $filter: EncounterFilterParams! = {}) {
    EncounterConnection(upid: $upid, filter: $filter) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
        }
      }
    }
  }
`;
