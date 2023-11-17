import { DocumentReference } from "fhir/r4";
import { gql } from "graphql-request";
import { fragmentCoding, fragmentOrganization } from "./fragments";
import { GraphqlConnectionNode, GraphqlPageInfo } from "../client";

export interface DocumentReferenceConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<DocumentReferenceWithBasics>[];
}

export type DocumentReferenceWithBasics = DocumentReference & {
  BasicList: fhir4.Basic[];
};

export interface DocumentReferenceGraphqlResponse {
  DocumentReferenceConnection: DocumentReferenceConnection;
}

// TODO - add BasicList when its supported by FQS
export const documentsQuery = gql`
  ${fragmentCoding}
  ${fragmentOrganization}
  query Documents(
    $upid: ID!
    $cursor: String!
    $sort: DocumentReferenceSortParams!
    $filter: DocumentReferenceFilterParams! = {}
    $first: Int!
  ) {
    DocumentReferenceConnection(
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
          text {
            id
            div
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
