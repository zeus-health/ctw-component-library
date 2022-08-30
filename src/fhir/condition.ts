// Medications can have either a medicationCodeableConcept or a
// medicationReference. This helper grabs the codeable concept

import { find } from "lodash";

import { SYSTEM_ICD10 } from "./system-urls";

export function getIDC10Code(condition: fhir4.Condition): string | undefined {
  return find(condition.code?.coding, {
    system: SYSTEM_ICD10,
  })?.code;
}
