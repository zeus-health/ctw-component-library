import { gql } from "graphql-request";

export const diagnosticReportQuery = (
  upid: string,
  count: number
) => gql`query DiagnosticReportConnection {
    DiagnosticReportConnection (upid: {$upid}, first: {$count}) {
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
        }
        status
        category {
          coding {
            system
            code
            display
            extension {
              url
              valueString
            }
          }
          text
        }
        code {
          coding {
            system
            code
            display
            extension {
              url
              valueString
            }
          }
          text
        }
        performer {
          resource { 
            ... on Practitioner {
              id
              resourceType
            }
            ... on Practitioner {
              id
              resourceType
            }
          }
        }
        subject {
          resource {
            ... on Patient {
              id
              gender
              resourceType
            }
            ... on Organization {
              id
              resourceType
            }
            ... on Practitioner {
              id
              resourceType
            }
            ... on Medication {
              id
              resourceType
            }
          }
        }
      encounter {
        reference
      }
      }
    }
  }
}
    `;
