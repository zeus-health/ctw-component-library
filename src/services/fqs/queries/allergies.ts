import { AllergyIntolerance } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentEncounter, fragmentPatient } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface AllergyConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<AllergyIntolerance>[];
}

export interface AllergyGraphqlResponse {
  AllergyConnection: AllergyConnection;
}

export const allergyQuery = gql`
  ${fragmentCoding}
  ${fragmentPatient}
  ${fragmentEncounter}
  query Allergy(
    $upid: ID!
    $cursor: String!
    $filter: AllergyFilterParams!
    $sort: AllergySortParams!
    $first: Int!
  ) {
    AllergyConnection(upid: $upid, after: $cursor, filter: $filter, sort: $sort, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          clinicalStatus {
            coding {
              ...Coding
            }
          }
          verificationStatus {
            coding {
              ...Coding
            }
          }
          type
          category
          criticality
          code {
            coding {
              ...Coding
            }
          }
          patient {
            reference
            resource {
              ...Patient
            }
          }
          encounter {
            reference
            resource {
              ...Encounter
            }
          }
          onsetDateTime
          onsetAge
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
          note
          reaction {
            substance {
              coding {
                ...Coding
              }
            }
            manifestation {
              coding {
                ...Coding
              }
            }
            onset
            severity
            note
          }
        }
      }
    }
  }
`;
