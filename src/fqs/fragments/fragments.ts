import { gql } from "graphql-request";

export const patientFragment = gql`... on Patient {
  id
  resourceType
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
      ...Name
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
    coding {
      ...Coding
    }
  }
  telecom {
    use
    value
    system
  }
  address {
    use
    type
    text
    line
    city
    district
    state
    postalCode
    country
  }
  name {
    ...Name
  }
}`;

export const practitionerFragment = gql`... on Practitioner {
  id
  resourceType
}`;

export const codingFragment = gql`... on Coding {
  code
  display
  system
}`;
