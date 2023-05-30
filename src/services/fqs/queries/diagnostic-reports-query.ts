import { DiagnosticReport } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentPatient } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface DiagnosticReportConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<DiagnosticReport>[];
}

export interface DiagnosticReportGraphqlResponse {
  DiagnosticReportConnection: DiagnosticReportConnection;
}

export const diagnosticReportQuery = gql`
  ${fragmentCoding}
  ${fragmentPatient}
  query Conditions(
    $upid: ID!
    $cursor: String!
    $filter: DiagnosticReportFilterParams!
    $sort: DiagnosticReportSortParams!
    $first: Int!
  ) {
    DiagnosticReportConnection(
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
          meta {
            extension {
              url
              valueInstant
            }
          }
          status
          category {
            coding {
              text
              coding {
                ...Coding
              }
            }
          }
          code {
            coding {
              text
              coding {
                ...Coding
              }
            }
          }
          contained {
            resource {
              ... on Patient {
                id
                resourceType
                contained {
                  resource {
                    ... on Organization {
                      id
                      resourceType
                      name
                    }
                  }
                }
              }
            }
            resource {
              ... on Organization {
                id
                resource
              }
            }
          }
          performer {
            resource {
              ... on Practitioner {
                id
                resourceType
              }
              ... on Practitioner {
                id
                resourceType
              }
            }
          }
          subject {
            resource {
              ... on Patient {
                id
                gender
                resourceType
              }
              ... on Organization {
                id
                resourceType
              }
              ... on Practitioner {
                id
                resourceType
              }
              ... on Medication {
                id
                resourceType
              }
            }
          }
          encounter {
            reference
            resource {
              ...Encounter
            }
          }
        }
      }
    }
  }
`;
