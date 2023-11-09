import { CodeableConcept } from "fhir/r4";
import { codeableConceptLabel } from "./codeable-concept";
import { SYSTEM_ICD10_CM, SYSTEM_NULL_FLAVOR, SYSTEM_RXNORM } from "./system-urls";
import { cloneDeep } from "@/utils/nodash";

describe("codeable concept", () => {
  describe("codeableConceptLabel", () => {
    const concept: CodeableConcept = {
      text: "meloxicam 7.5 MG Oral Tablet",
      coding: [
        {
          code: "311486",
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
        },
        {
          code: "41493",
          display: "meloxicam",
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          extension: [
            {
              url: "https://zusapi.com/terminology/enrichment",
              valueString: "ActiveIngredient",
            },
          ],
        },
        {
          code: "41493",
          display: "meloxicam 7.5 MG Tablet",
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
        },
        {
          code: "UNK",
          display: "unknown",
          system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
        },
      ],
    };

    const conceptWithoutText = cloneDeep(concept);
    conceptWithoutText.text = undefined;

    test("returns text if there is one", () => {
      expect(codeableConceptLabel(concept)).toEqual("meloxicam 7.5 MG Oral Tablet");
    });

    test("returns first display if there is no text", () => {
      expect(codeableConceptLabel(conceptWithoutText)).toEqual("meloxicam");
    });

    test("returns first code if there is no text and no displays", () => {
      const concept2: CodeableConcept = {
        coding: [
          {
            code: "311486",
            system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          },
          {
            code: "41493",
            system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          },
        ],
      };

      expect(codeableConceptLabel(concept2)).toEqual("311486");
    });

    test("returns display of specific system", () => {
      expect(codeableConceptLabel(concept, SYSTEM_RXNORM)).toEqual("meloxicam 7.5 MG Tablet");
      expect(codeableConceptLabel(concept, SYSTEM_NULL_FLAVOR)).toEqual("unknown");
    });

    test("returns text if specific system has no display", () => {
      expect(codeableConceptLabel(concept, SYSTEM_ICD10_CM)).toEqual(
        "meloxicam 7.5 MG Oral Tablet"
      );
    });
  });
});
