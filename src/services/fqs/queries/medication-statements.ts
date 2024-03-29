import { MedicationStatement } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentBasic, fragmentCoding, fragmentReference } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface MedicationStatementConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<MedicationStatementWithBasics>[];
}

export type MedicationStatementWithBasics = MedicationStatement & {
  BasicList: fhir4.Basic[];
};

export interface MedicationStatementGraphqlResponse {
  MedicationStatementConnection: MedicationStatementConnection;
}

export const medicationStatementQuery = gql`
  ${fragmentCoding}
  ${fragmentReference}
  ${fragmentBasic}
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
          BasicList(_reference: "subject") {
            ...Basic
          }
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
              display
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
            text
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
                _organization__name: name
              }
              ... on Medication {
                id
                resourceType
                code {
                  text
                  coding {
                    ...Coding
                  }
                }
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
          subject {
            resource {
              ... on Patient {
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
        }
      }
    }
  }
`;
