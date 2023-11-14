import { Immunization } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentOrganization, fragmentPatient } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ImmunizationConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<Immunization>[];
}

export interface ImmunizationGraphqlResponse {
  ImmunizationConnection: ImmunizationConnection;
}

export const immunizationsQuery = gql`
  ${fragmentOrganization}
  ${fragmentCoding}
  ${fragmentOrganization}
  ${fragmentPatient}
  query Immunizations($upid: ID!, $cursor: String!, $sort: ImmunizationSortParams!, $first: Int!) {
    ImmunizationConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
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
            valueString
          }
          status
          statusReason {
            text
            coding {
              ...Coding
            }
          }
          vaccineCode {
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
          occurrenceDateTime
          occurrenceString
          recorded
          lotNumber
          expirationDate
        }
      }
    }
  }
`;
