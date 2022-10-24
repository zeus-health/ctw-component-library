// Returns a predicate for use with lodash that will find
// a coding with the given code within an array of CodeableConcepts.
// E.g. find(concepts, codeableConceptPredicate("C")) will find the first

import { find } from "lodash";
import { BEST_CODE_PREFERENCE_ORDER } from "./conditions";
import { SYSTEM_ENRICHMENT } from "./system-urls";

// concept that has a code of "C".
export const codeableConceptPredicate = (code: string) => [
  { coding: [{ code }] },
];

export const codeableConceptLabel = (concept?: fhir4.CodeableConcept): string =>
  concept?.text ??
  concept?.coding?.[0]?.display ??
  concept?.coding?.[0]?.code ??
  "";

export function findCoding(
  system: string,
  concept?: fhir4.CodeableConcept
): fhir4.Coding | undefined {
  return find(concept?.coding, { system });
}

export function findCodingWithEnrichment(
  system: string,
  concept?: fhir4.CodeableConcept
): fhir4.Coding | undefined {
  return find(concept?.coding, {
    system,
    extension: [{ url: SYSTEM_ENRICHMENT }],
  });
}

export const findCodingByOrderOfPreference = (
  concept: fhir4.CodeableConcept | undefined
): fhir4.Coding | undefined => {
  let codeSystem;

  for (let i = 0; i < BEST_CODE_PREFERENCE_ORDER.length; i += 1) {
    const code = BEST_CODE_PREFERENCE_ORDER[i];
    if (code.checkForEnrichment) {
      codeSystem = findCodingWithEnrichment(code.system, concept);
      if (codeSystem) {
        break;
      }
    }
    codeSystem = findCoding(code.system, concept);
    if (codeSystem) {
      break;
    }
  }

  return codeSystem;
};
