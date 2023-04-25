import { gql } from "graphql-request"

export const AllergyListForPatientQuery = gql`
query getAllergiesListForUPID($upid: String!) {
    AllergyIntoleranceConnection (upid: $upid, first: 250) {
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
          
          code {
              ... on CodeableConcept {
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
          }
          
          reaction {
              manifestation {
                  text
              }
          }
        }
      }
    }
  }
`
