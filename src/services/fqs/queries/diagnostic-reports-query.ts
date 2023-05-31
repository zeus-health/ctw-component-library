import { DiagnosticReport } from "fhir/r4";
import { gql } from "graphql-request";
import {
  fragmentCoding,
  fragmentMedicationRequest,
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
  query Conditions(
    $upid: ID!
    $cursor: String!
    $filter: DiagnosticReportFilterParams!
    $sort: DiagnosticReportSortParams!
  ) {
    DiagnosticReportConnection(upid: $upid, after: $cursor, filter: $filter, sort: $sort) {
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
        }
      }
    }
  }
`;
