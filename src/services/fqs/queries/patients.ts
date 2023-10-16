import { Encounter, Patient } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentEncounter } from "./fragments/encounter";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";
import { fragmentOrganization, fragmentPatient } from "./fragments";

export interface PatientConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Patient>[];
}

export interface PatientGraphqlResponse {
  PatientConnection: PatientConnection;
}

export const patientQuery = gql`
  ${fragmentPatient}
  ${fragmentOrganization}

  query Patients(
    $upid: ID!
    $cursor: String!
    $sort: PatientSortParams!
    $first: Int!
    $filter: PatientFilterParams! = {}
  ) {
    PatientConnection(upid: $upid, after: $cursor, sort: $sort, first: $first, filter: $filter) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...Patient
        }
      }
    }
  }
`;
