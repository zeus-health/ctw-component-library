import { gql } from "graphql-request";

export const getAllergiesQuery = (upid: string) => gql`
  {
    AllergyIntoleranceList(upid: "${upid}") {
      id
      meta {
        tag {
          system
          code
        }
      }
      identifier {
        id
        system
        use
        type {
          coding {
            code
            display
            system
          }
        }
        period {
          start
          end
        }
        value
      }
      type
      clinicalStatus {
        coding {
          code
          display
          system
        }
      }
      code {
        coding {
          code
          display
          system
        }
      }
      category
      onsetAge {
        value
        unit
      }
      onsetRange {
        low {
          value
        }
        high {
          value
        }
      }
      onsetPeriod {
        start
        end
      }
      onsetString
      onsetDateTime
      reaction {
        id
        manifestation {
          coding {
            code
            display
            system
          }
        }
      }
    }
  }
`;
