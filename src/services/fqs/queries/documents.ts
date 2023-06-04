import { DocumentReference } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentOrganization } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface DocumentConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<DocumentReference>[];
}

export interface DocumentGraphqlResponse {
  DocumentConnection: DocumentConnection;
}

export const documentsQuery = gql`
  ${fragmentCoding}
  ${fragmentOrganization}
  query Documents($upid: ID!, $cursor: String!, $sort: DocumentSortParams!, $first: Int!) {
    DocumentConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
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
          status
          docStatus
          type {
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
          date
          custodian {
            reference
            resource {
              ...Organization
            }
          }
          description
          content {
            attachment {
              contentType
              language
              data
              url
              size
              hash
              title
              creation
            }
            format {
              system
              versionId
              code
              display
            }
          }
        }
      }
    }
  }
`;
