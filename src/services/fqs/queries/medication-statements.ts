import { MedicationStatement } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentReference } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface MedicationStatementConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<MedicationStatement>[];
}

export interface MedicationStatementGraphqlResponse {
  MedicationStatementConnection: MedicationStatementConnection;
}

export const medicationStatementQuery = gql`
  ${fragmentCoding}
  ${fragmentReference}
  query MedicationStatements(
    $upid: ID!
    $cursor: String!
    $filter: MedicationStatementFilterParams!
    $sort: MedicationStatementSortParams!
    $first: Int!
  ) {
    MedicationStatementConnection(
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
            tag {
              system
              code
            }
            versionId
          }
          extension {
            url
            extension {
              url
              valueReference {
                id
                type
                reference
              }
            }
            valueDateTime
            valueString
            valueReference {
              id
              type
              reference
            }
            valueQuantity {
              unit
              value
            }
            valueUnsignedInt
          }
          basedOn {
            type
          }
          category {
            coding {
              ...Coding
            }
          }
          contained {
            resource {
              ... on Practitioner {
                id
                resourceType
                name {
                  family
                  given
                }
              }
              ... on Organization {
                id
                resourceType
                organizationName: name
              }
            }
          }
          context {
            display
          }
          dateAsserted
          derivedFrom {
            display
          }
          dosage {
            text
          }
          effectivePeriod {
            start
          }
          identifier {
            value
          }
          informationSource {
            type
          }
          medicationCodeableConcept {
            text
            coding {
              ...Coding
            }
          }
          medicationReference {
            display
          }
          note {
            text
          }
          partOf {
            display
          }
          reasonCode {
            text
            coding {
              ...Coding
            }
          }
          reasonReference {
            ...Reference
          }
          status
          statusReason {
            text
            coding {
              ...Coding
            }
          }
        }
      }
    }
  }
`;
