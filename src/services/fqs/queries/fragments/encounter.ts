import { gql } from "graphql-request";
import { fragmentLocation } from "./location";
import { fragmentCoding } from "../fragments";

export const fragmentEncounter = gql`
  ${fragmentCoding}
  ${fragmentLocation}

  fragment Encounter on Encounter {
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
    class {
      system
      version
      code
      display
    }
    type {
      text
      coding {
        ...Coding
      }
    }
    serviceType {
      text
      coding {
        ...Coding
      }
    }
    priority {
      text
      coding {
        ...Coding
      }
    }
    diagnosis {
      condition {
        reference
        resource {
          ... on Condition {
            id
            resourceType
            code {
              coding {
                ...Coding
              }
              text
            }
          }
          ... on Procedure {
            id
            resourceType
            code {
              coding {
                ...Coding
              }
              text
            }
          }
        }
      }
    }
    participant {
      type {
        text
        coding {
          ...Coding
        }
      }
      period {
        start
        end
      }
    }
    period {
      start
      end
    }
    length {
      value
      unit
    }
    reasonCode {
      text
      coding {
        ...Coding
      }
    }
    location {
      location {
        reference
        resource {
          ...Location
        }
      }
      status
      period {
        start
        end
      }
    }
  }
`;
