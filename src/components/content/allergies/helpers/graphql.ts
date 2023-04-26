import { AllergyIntolerance } from "fhir/r4";
import { gql } from "graphql-request"

// TODO: this should be leveraged across graphql requests
// TODO: this does not have the cursor if there's a next page
export interface GraphqlPageInfo {
  hasNextPage: boolean;
}

// TODO: this should be leveraged across graphql requests
export interface GraphqlConnectionNode<T> {
  node: T
}

// TODO: make this a generic type
export interface AllergyIntoleranceConnection {
  pageInfo: GraphqlPageInfo;
  edges: GraphqlConnectionNode<AllergyIntolerance>[];

}

export interface AllergyGraphqlResponse {
  AllergyIntoleranceConnection: AllergyIntoleranceConnection;
}

export const AllergyListForPatientQuery = gql`
query getAllergiesListForUPID($upid: ID!) {
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

          patient {
            reference
          }
        }
      }
    }
  }
`
