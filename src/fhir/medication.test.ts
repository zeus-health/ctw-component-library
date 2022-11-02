import { MedicationStatement } from "fhir/r4";
import { getIdentifyingRxNormCode } from "./medication";
import { SYSTEM_ENRICHMENT, SYSTEM_RXNORM } from "./system-urls";

const baseMed: MedicationStatement = {
  resourceType: "MedicationStatement",
  status: "active",
  subject: {
    reference: "test",
  },
};

const testRxNormCode = "12345";

describe("getIdentifyingRxNormCode", () => {
  test("gets RxNorm code from codeable concept", () => {
    const testMed = {
      ...baseMed,
      medicationCodeableConcept: {
        coding: [
          {
            code: testRxNormCode,
            system: SYSTEM_RXNORM,
          },
        ],
      },
    };

    expect(getIdentifyingRxNormCode(testMed)).toEqual(testRxNormCode);
  });

  test("returns undefined if no RxNorm code exists", () => {
    const testMed = {
      ...baseMed,
      medicationCodeableConcept: {
        coding: [
          {
            code: "some other code",
            system: "some other system",
          },
        ],
      },
    };

    expect(getIdentifyingRxNormCode(testMed)).toBeUndefined();
  });

  test("ignores Active Ingredient codes", () => {
    const testMed = {
      ...baseMed,
      medicationCodeableConcept: {
        coding: [
          {
            code: "some other code",
            system: SYSTEM_RXNORM,
            extension: [
              {
                url: SYSTEM_ENRICHMENT,
                valueString: "ActiveIngredient",
              },
            ],
          },
        ],
      },
    };

    expect(getIdentifyingRxNormCode(testMed)).toBeUndefined();
  });

  test("ignores Brand Name codes", () => {
    const testMed = {
      ...baseMed,
      medicationCodeableConcept: {
        coding: [
          {
            code: "some other code",
            system: SYSTEM_RXNORM,
            extension: [
              {
                url: SYSTEM_ENRICHMENT,
                valueString: "BrandName",
              },
            ],
          },
        ],
      },
    };

    expect(getIdentifyingRxNormCode(testMed)).toBeUndefined();
  });

  test("chooses correct code when multiple exist", () => {
    const testMed = {
      ...baseMed,
      medicationCodeableConcept: {
        coding: [
          {
            code: "some other code",
            system: SYSTEM_RXNORM,
            extension: [
              {
                url: SYSTEM_ENRICHMENT,
                valueString: "BrandName",
              },
            ],
          },
          {
            code: testRxNormCode,
            system: SYSTEM_RXNORM,
          },
          {
            code: "some other code",
            system: SYSTEM_RXNORM,
            extension: [
              {
                url: SYSTEM_ENRICHMENT,
                valueString: "ActiveIngredient",
              },
            ],
          },
        ],
      },
    };

    expect(getIdentifyingRxNormCode(testMed)).toEqual(testRxNormCode);
  });
});
