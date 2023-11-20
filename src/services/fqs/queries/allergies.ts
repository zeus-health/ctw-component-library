import { AllergyIntolerance } from "fhir/r4";
import { gql } from "graphql-request";
import {
  fragmentBasic,
  fragmentCoding,
  fragmentEncounterReference,
  fragmentOrganization,
  fragmentPatient,
  fragmentPractitioner,
} from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface AllergyIntoleranceConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<AllergyIntoleranceWithBasics>[];
}

export type AllergyIntoleranceWithBasics = AllergyIntolerance & {
  BasicList: fhir4.Basic[];
};

export interface AllergyGraphqlResponse {
  AllergyIntoleranceConnection: AllergyIntoleranceConnection;
}

export const allergyQuery = gql`
  ${fragmentCoding}
  ${fragmentOrganization}
  ${fragmentPatient}
  ${fragmentEncounterReference}
  ${fragmentPractitioner}
  ${fragmentBasic}
  query Allergies(
    $upid: ID!
    $cursor: String!
    $sort: AllergyIntoleranceSortParams!
    $filter: AllergyIntoleranceFilterParams! = {}
    $first: Int!
  ) {
    AllergyIntoleranceConnection(
      upid: $upid
      after: $cursor
      sort: $sort
      filter: $filter
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
            tag {
              system
              code
              display
            }
          }
          clinicalStatus {
            text
            coding {
              ...Coding
            }
          }
          extension {
            url
            valueString
          }
          verificationStatus {
            text
            coding {
              ...Coding
            }
          }
          type
          category
          criticality
          code {
            text
            coding {
              ...Coding
            }
          }
          patient {
            reference
            resource {
              ... on Patient {
                ...Patient
                managingOrganization {
                  resource {
                    ... on Organization {
                      name
                    }
                  }
                }
              }
            }
          }
          encounter {
            reference
            resource {
              ...Encounter
            }
          }
          onsetDateTime
          onsetAge {
            value
            unit
            system
            code
          }
          onsetPeriod {
            start
            end
          }
          recordedDate
          recorder {
            reference
            resource {
              ...Practitioner
            }
          }
          lastOccurrence
          note {
            text
            time
          }
          reaction {
            substance {
              text
              coding {
                ...Coding
              }
            }
            manifestation {
              text
              coding {
                ...Coding
              }
            }
            onset
            severity
            note {
              text
              time
            }
          }
        }
      }
    }
  }
`;
