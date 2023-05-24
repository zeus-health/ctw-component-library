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

export const fragmentPatient = gql`
  fragment Patient on Patient {
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
  }
`;
