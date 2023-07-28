import { DiagnosticReport } from "fhir/r4";
import { gql } from "graphql-request";
import {
  fragmentCoding,
  fragmentMedicationRequest,
  fragmentObservation,
  fragmentPatient,
  fragmentPractitioner,
} from "./fragments";
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
  ${fragmentPractitioner}
  ${fragmentMedicationRequest}
  ${fragmentObservation}
  query DiagnosticReportConnection(
    $upid: ID!
    $cursor: String!
    $sort: DiagnosticReportSortParams!
    $filter: DiagnosticReportFilterParams!
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
          extension {
            url
            valueString
          }
          basedOn {
            reference
            resource {
              ...MedicationRequest
            }
          }
          status
          category {
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
          subject {
            reference
            resource {
              ...Patient
            }
          }
          effectiveDateTime
          effectivePeriod {
            start
            end
          }
          issued
          conclusion
          performer {
            reference
            resource {
              ...Practitioner
            }
          }
          result {
            reference
            display
            resource {
              ...Observation
            }
          }
          contained {
            resource {
              ... on Observation {
                ...Observation
              }
            }
          }
        }
      }
    }
  }
`;
