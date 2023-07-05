import { gql } from "graphql-request";
import { fragmentCodeableConcept } from "./codeable-concept";

export const fragmentEncounter = gql`
  ${fragmentCodeableConcept}

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
      }
      status
      period {
        start
        end
      }
    }
  }
`;
