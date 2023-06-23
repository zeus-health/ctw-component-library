import { gql } from "graphql-request";
import { fragmentCoding } from "../fragments";

export const fragmentCodeableConcept = gql`
  ${fragmentCoding}

  fragment CodeableConcept on CodeableConcept {
    text
    coding {
      ...Coding
    }
  }
`;
