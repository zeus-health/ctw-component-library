import { gql } from "graphql-request";

export const address = gql`
  fragment Address on Address {
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
`;

export const coding = gql`
  fragment Coding on Coding {
    code
    display
    system
  }
`;

export const humanName = gql`
  fragment HumanName on HumanName {
    family
    given
    prefix
    suffix
    text
    use
  }
`;

export const patient = gql`
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
