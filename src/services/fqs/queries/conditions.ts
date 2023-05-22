import { gql } from "graphql-request";
import { fragmentCoding, fragmentPatient } from "./fragments";

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
              coding {
                ...Coding
              }
            }
          }
          verificationStatus {
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
            coding {
              ...Coding
            }
          }
          stage {
            summary {
              coding {
                ...Coding
              }
            }
            type {
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
