import { gql } from "graphql-request";

export const fragmentCoding = gql`
  fragment Coding on Coding {
    code
    display
    system
    extension {
      url
      valueString
    }
  }
`;

export const fragmentEncounterReference = gql`
  fragment Encounter on Encounter {
    id
    resourceType
    extension {
      url
      valueString
    }
    status
    priority {
      text
      coding {
        code
        display
        system
      }
    }
  }
`;

export const fragmentPractitioner = gql`
  fragment Practitioner on Practitioner {
    id
    resourceType
    extension {
      url
      valueString
    }
    name {
      family
      given
      prefix
      suffix
      text
      use
    }
    qualification {
      code {
        text
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
    }
  }
`;

export const fragmentMedicationRequest = gql`
  fragment MedicationRequest on MedicationRequest {
    id
    resourceType
    extension {
      url
      valueString
    }
    status
    intent
  }
`;

export const fragmentPatient = gql`
  fragment Patient on Patient {
    id
    resourceType
    meta {
      extension {
        url
        valueString
        valueInstant
      }
      tag {
        system
        code
      }
    }
    active
    identifier {
      use
      system
      value
    }
    contact {
      address {
        city
        country
        district
        line
        period {
          start
          end
        }
        postalCode
        state
        text
        type
        use
      }
      gender
      name {
        family
        given
        prefix
        suffix
        text
        use
      }
      organization {
        display
        identifier {
          value
        }
        type
      }
    }
    birthDate
    gender
    maritalStatus {
      text
      coding {
        code
        display
        system
      }
    }
    telecom {
      use
      value
      system
    }
    address {
      city
      country
      district
      line
      period {
        start
        end
      }
      postalCode
      state
      text
      type
      use
    }
    name {
      family
      given
      prefix
      suffix
      text
      use
    }
    managingOrganization {
      id
      resourceType
      extension {
        url
        valueString
      }
      name
      telecom {
        system
        value
        period {
          start
          end
        }
      }
      contact {
        purpose {
          text
          coding {
            code
            display
            system
            extension {
              url
              valueString
            }
          }
        }
        name {
          family
          given
          prefix
          suffix
          text
          use
        }
        telecom {
          system
          value
          period {
            start
            end
          }
        }
        address {
          type
          use
          text
          line
          city
          district
          state
          postalCode
          country
          period {
            start
            end
          }
        }
      }
    }
  }
`;

export const fragmentReference = gql`
  fragment Reference on Reference {
    id
    extension {
      url
      valueString
    }
    reference
    type
    identifier {
      id
      system
      value
    }
    display
  }
`;

export const fragmentObservation = gql`
  fragment Observation on Observation {
    id
    resourceType
    extension {
      url
      valueString
    }
    status
    category {
      text
      coding {
        code
        display
        system
        extension {
          url
          valueString
        }
      }
    }
    effectivePeriod {
      start
      end
    }
    effectiveDateTime
    referenceRange {
      text
    }
    code {
      text
      coding {
        code
        display
        system
        extension {
          url
          valueString
        }
      }
    }
    valueQuantity {
      comparator
      unit
      value
      system
      code
    }
    valueCodeableConcept {
      text
      coding {
        system
        code
        display
      }
    }
    valueString
    valueBoolean
    valueInteger
    valueRange {
      low {
        unit
        value
        system
        code
      }
      high {
        unit
        value
        system
        code
      }
    }
    valueRatio {
      numerator {
        comparator
        unit
        value
        system
        code
      }
      denominator {
        unit
        value
        system
        code
      }
    }
    valueTime
    valueDateTime
    valuePeriod {
      start
      end
    }
    interpretation {
      text
      coding {
        code
        display
        system
        extension {
          url
          valueString
        }
      }
    }
  }
`;

export const fragmentOrganization = gql`
  fragment Organization on Organization {
    id
    resourceType
    extension {
      url
      valueString
    }
    name
    telecom {
      system
      value
      period {
        start
        end
      }
    }
    contact {
      purpose {
        text
        coding {
          code
          display
          system
          extension {
            url
            valueString
          }
        }
      }
      name {
        family
        given
        prefix
        suffix
        text
        use
      }
      telecom {
        system
        value
        period {
          start
          end
        }
      }
      address {
        type
        use
        text
        line
        city
        district
        state
        postalCode
        country
        period {
          start
          end
        }
      }
    }
  }
`;
