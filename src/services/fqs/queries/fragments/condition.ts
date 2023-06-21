import { gql } from "graphql-request";
import { fragmentCoding, fragmentPatient } from "../fragments";

export const fragmentCondition = gql`
  ${fragmentCoding}
  ${fragmentPatient}

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
`;

export const fragmentConditionHistory = gql`
  ${fragmentCoding}

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
    subject {
      reference
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
`;
