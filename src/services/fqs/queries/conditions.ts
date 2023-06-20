import { Condition } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentPatient } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ConditionConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Condition>[];
}

export interface ConditionGraphqlResponse {
  ConditionConnection: ConditionConnection;
}

export const conditionsQuery = gql`
  ${fragmentCoding}
  ${fragmentPatient}
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
          id
          resourceType
          meta {
            tag {
              system
              code
            }
            versionId
          }
          subject {
            reference
            resource {
              ...Patient
            }
          }
          abatementAge {
            value
          }
          abatementDateTime
          abatementPeriod {
            start
          }
          abatementRange {
            low {
              value
            }
          }
          abatementString
          clinicalStatus {
            text
            coding {
              ...Coding
            }
          }
          asserter {
            display
          }
          bodySite {
            text
            coding {
              ...Coding
            }
          }
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
          }
          encounter {
            display
          }
          evidence {
            code {
              text
              coding {
                ...Coding
              }
            }
          }
          verificationStatus {
            text
            coding {
              ...Coding
            }
          }
          note {
            text
          }
          onsetAge {
            value
          }
          onsetDateTime
          onsetPeriod {
            start
          }
          onsetRange {
            low {
              value
            }
          }
          onsetString
          recordedDate
          recorder {
            display
          }
          severity {
            text
            coding {
              ...Coding
            }
          }
          stage {
            summary {
              text
              coding {
                ...Coding
              }
            }
            type {
              text
              coding {
                ...Coding
              }
            }
          }
        }
      }
    }
  }
`;
