import { fragmentCoding, fragmentOrganization, fragmentPatient } from "../fragments";

const subjectFragment = `subject {
      reference
      resource {
        ... on Patient {
          ...Patient
          managingOrganization {
            resource {
              ... on Organization {
                name
              }
            }
          }
        }
      }
    }`;

export const fragmentCondition = `
    ${fragmentOrganization}      
    ${fragmentCoding}
    ${fragmentPatient}
    ${fragmentOrganization}
    fragment Condition on Condition {
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
      ${subjectFragment}
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
  `;
