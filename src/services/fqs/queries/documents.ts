import { DocumentReference } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentOrganization } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface DocumentReferenceConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<DocumentReference>[];
}

export interface DocumentReferenceGraphqlResponse {
  DocumentReferenceConnection: DocumentReferenceConnection;
}

export const documentsQuery = gql`
  ${fragmentCoding}
  ${fragmentOrganization}
  query DocumentReference(
    $upid: ID!
    $cursor: String!
    $sort: DocumentReferenceSortParams!
    $first: Int!
  ) {
    DocumentReferenceConnection(upid: $upid, after: $cursor, sort: $sort, first: $first) {
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
              version
              code
              display
            }
          }
          context {
            period {
              start
              end
            }
          }
        }
      }
    }
  }
`;
