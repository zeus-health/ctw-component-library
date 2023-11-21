import { gql } from "graphql-request";
import { fragmentCodeableConcept } from "./codeable-concept";
import { fragmentBasic, fragmentReference } from "../fragments";

export const fragmentEncounter = gql`
  ${fragmentCodeableConcept}
  ${fragmentReference}
  ${fragmentBasic}

  fragment Encounter on Encounter {
    id
    resourceType
    BasicList(_reference: "subject") {
      ...Basic
    }
    meta {
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
    class {
      system
      version
      code
      display
    }
    type {
      ...CodeableConcept
    }
    serviceType {
      ...CodeableConcept
    }
    priority {
      ...CodeableConcept
    }
    diagnosis {
      condition {
        reference
        display
      }
    }
    participant {
      individual {
        reference
        display
      }
      type {
        ...CodeableConcept
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
    ProvenanceList(_reference: "target") {
      id
      entity {
        what {
          ...Reference
        }
      }
    }
    length {
      value
      unit
    }
    reasonCode {
      ...CodeableConcept
    }
    hospitalization {
      dischargeDisposition {
        ...CodeableConcept
      }
    }
    location {
      location {
        reference
        display
        resource {
          ... on Location {
            name
            type {
              ...CodeableConcept
            }
          }
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
