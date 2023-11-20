import { Immunization } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentBasic, fragmentCoding, fragmentOrganization, fragmentPatient } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface ImmunizationConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<ImmunizationWithBasics>[];
}

export type ImmunizationWithBasics = Immunization & {
  BasicList: fhir4.Basic[];
};

export interface ImmunizationGraphqlResponse {
  ImmunizationConnection: ImmunizationConnection;
}

export const immunizationsQuery = gql`
  ${fragmentCoding}
  ${fragmentOrganization}
  ${fragmentPatient}
  ${fragmentBasic}
  query Immunizations($upid: ID!, $cursor: String!, $sort: ImmunizationSortParams!, $first: Int!) {
    ImmunizationConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
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
