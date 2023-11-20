import { DiagnosticReport } from "fhir/r4";
import { gql } from "graphql-request";
import {
  fragmentBasic,
  fragmentCoding,
  fragmentObservation,
  fragmentOrganization,
  fragmentPatient,
  fragmentPractitioner,
} from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface DiagnosticReportConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<DiagnosticReportWithBasics>[];
}

export type DiagnosticReportWithBasics = DiagnosticReport & {
  BasicList: fhir4.Basic[];
};

export interface DiagnosticReportGraphqlResponse {
  DiagnosticReportConnection: DiagnosticReportConnection;
}

const observationsProperties = gql`result {
  reference
  display
  resource {
    ...Observation
  }
}
contained {
  resource {
    ...Observation
  }
}`;

export const getDiagnosticReportQuery = (includeObservations: boolean) => gql`    
  ${fragmentCoding}
  ${fragmentOrganization}
  ${fragmentPatient}
  ${fragmentPractitioner}
  ${fragmentBasic}
  ${includeObservations ? fragmentObservation : ""}
  query DiagnosticReports(
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
          BasicList(_reference: "subject") {
            ...Basic
          }
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
          ${includeObservations ? observationsProperties : ""}
        }
      }
    }
  }
`;
