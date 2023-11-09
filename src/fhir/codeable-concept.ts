// Returns a predicate for use with lodash that will find
// a coding with the given code within an array of CodeableConcepts.
// E.g. find(concepts, codeableConceptPredicate("C")) will find the first

import { SYSTEM_ENRICHMENT } from "./system-urls";
import { compact, find } from "@/utils/nodash";

/**
  Finds the best display text for a CodeableConcept.
 
  Priority order is:
    1. The display of the coding with the given favoredSystemDisplay
       (skipping enrichment extensions!).
    2. The text of the CodeableConcept.
    3. The display of the first coding with a display.
    4. The code of the first coding with a code.
 */
export const codeableConceptLabel = (
  concept?: fhir4.CodeableConcept,
  favoredSystemDisplay?: string
): string => {
  if (favoredSystemDisplay && concept?.coding) {
    const coding = concept.coding.find(
      (c) => c.system === favoredSystemDisplay && c.display && !c.extension
    );
    if (coding && coding.display) {
      return coding.display;
    }
  }

  const firstWithDisplay = concept?.coding?.find((c) => c.display);
  const firstWithCode = concept?.coding?.find((c) => c.code);
  return concept?.text ?? firstWithDisplay?.display ?? firstWithCode?.code ?? "";
};

// Returns text if there is one, otherwise returns the first display text or an empty string.
export const codeableConceptTextOrDisplay = (concept?: fhir4.CodeableConcept): string => {
  if (concept?.text) {
    return concept.text;
  }

  const firstDisplay = compact(concept?.coding?.map((c) => c.display))[0] as string | undefined;
  return firstDisplay ?? "";
};

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
