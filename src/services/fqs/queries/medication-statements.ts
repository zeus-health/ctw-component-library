import { MedicationStatement } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentPatient, fragmentReference } from "./fragments";
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
  ${fragmentPatient}
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
            reference {
              ...Reference
            }
          }
          medicationCodeableConcept {
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
            coding {
              ...Coding
            }
          }
          reasonReference {
            reference {
              ...Reference
            }
          }
          status
          statusReason {
            coding {
              ...Coding
            }
          }
          subject {
            reference {
              ...Reference
            }
          }
          
      }
    }
  }
`;
