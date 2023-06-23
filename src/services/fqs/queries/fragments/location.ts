import { gql } from "graphql-request";

export const fragmentLocation = gql`
  fragment Location on Location {
    id
    resourceType
    status
    name
    description
    type {
      coding {
        code
        display
        system
        extension {
          url
          valueString
        }
      }
      text
    }
    telecom {
      use
      value
      system
    }
  }
`;
