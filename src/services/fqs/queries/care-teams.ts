import { CareTeam } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentPractitioner } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface CareTeamConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<CareTeam>[];
}

export interface CareTeamGraphqlResponse {
  CareTeamConnection: CareTeamConnection;
}

export const careTeamsQuery = gql`
  ${fragmentCoding}
  ${fragmentPractitioner}
  query CareTeams($upid: ID!, $cursor: String!, $sort: CareTeamSortParams!, $first: Int!) {
    CareTeamConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          resourceType
          meta {
            extension {
              url
              valueInstant
            }
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
          category {
            text
            coding {
              ...Coding
            }
          }
          name
          period {
            start
            end
          }
          participant {
            role {
              text
              coding {
                ...Coding
              }
            }
            member {
              reference
              resource {
                ...Practitioner
              }
            }
            onBehalfOf {
              reference
            }
          }
          reasonCode {
            text
            coding {
              ...Coding
            }
          }
          telecom {
            system
            value
            use
            period {
              start
              end
            }
          }
          note {
            text
          }
        }
      }
    }
  }
`;
