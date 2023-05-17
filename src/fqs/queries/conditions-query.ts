import { gql } from "graphql-request";

export const conditionsQuery = (upid: string, count: number, cursor: string) => gql`
  query Conditions {
    ConditionConnection(upid: "${upid}", after: "${cursor}", first: "${count}") {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          resourceType
          meta {
            tag {
              system
            }
            versionId
          }
          subject {
            reference
            resource {
              ...Patient
            }
          }
          abatementAge {
            value
          }
          abatementDateTime
          abatementPeriod {
            start
          }
          abatementRange {
            low {
              value
            }
          }
          abatementString
          clinicalStatus {
            coding {
              ...Coding
            }
          }
          asserter {
            display
          }
          bodySite {
            text
            coding {
              ...Coding
            }
          }
          category {
            text
            coding {
              ...Coding
            }
          }
          code {
            coding {
              ...Coding
            }
          }
          encounter {
            display
          }
          evidence {
            code {
              coding {
                ...Coding
              }
            }
          }
          verificationStatus {
            coding {
              ...Coding
            }
          }
          note {
            text
          }
          onsetAge {
            value
          }
          onsetDateTime
          onsetPeriod {
            start
          }
          onsetRange {
            low {
              value
            }
          }
          onsetString
          recordedDate
          recorder {
            display
          }
          severity {
            coding {
              ...Coding
            }
          }
          stage {
            summary {
              coding {
                ...Coding
              }
            }
            type {
              coding {
                ...Coding
              }
            }
          }
        }
      }
    }
  }

  fragment Coding on Coding {
    code
    display
    system
  }

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
        ..Address
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
      ..Address
    }
    name {
      ...Name
    }
  }

  fragment Name on HumanName {
    family
    given
    prefix
    suffix
    text
    use
  }

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
