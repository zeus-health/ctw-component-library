// Returns a predicate for use with lodash that will find
// a coding with the given code within an array of CodeableConcepts.
// E.g. find(concepts, codeableConceptPredicate("C")) will find the first

import { find } from "lodash";
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

export type CodePreference = { system: string; checkForEnrichment?: boolean };

export const findCodingByOrderOfPreference = (
  preferences: CodePreference[],
  concept: fhir4.CodeableConcept | undefined
): fhir4.Coding | undefined => {
  for (let i = 0; i < preferences.length; i += 1) {
    const code = preferences[i];
    if (code.checkForEnrichment) {
      const coding = findCodingWithEnrichment(code.system, concept);
      if (coding) {
        return coding;
      }
    } else {
      const coding = findCoding(code.system, concept);
      if (coding) {
        return coding;
      }
    }
  }

  return undefined;
};
