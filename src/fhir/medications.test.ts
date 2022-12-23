import { MedicationStatement } from "fhir/r4";
import {
  filterMedicationsWithNoRxNorms,
  splitMedications,
} from "./medications";
import { SYSTEM_RXNORM } from "./system-urls";

describe("splitSummarizedMedications", () => {
  test("splits medications correctly", () => {
    const lensMeds: MedicationStatement[] = [
      {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: "Test",
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: SYSTEM_RXNORM,
              code: "known",
            },
          ],
          text: "lens med display",
        },
        dosage: [
          {
            text: "lens dosage display",
          },
        ],
      },
      {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: "Test",
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: SYSTEM_RXNORM,
              code: "unknown",
            },
          ],
        },
      },
    ];

    const builderMeds: MedicationStatement[] = [
      {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: "Test",
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: SYSTEM_RXNORM,
              code: "known",
            },
          ],
          text: "builder med display",
        },
        dosage: [
          {
            text: "builder dosage display",
          },
        ],
      },
    ];

    const { builderMedications, otherProviderMedications } = splitMedications(
      lensMeds,
      builderMeds
    );

    expect(builderMedications).toHaveLength(1);
    expect(otherProviderMedications).toHaveLength(1);

    expect(builderMedications).toHaveProperty(
      "0.medicationCodeableConcept.coding.0.code",
      "known"
    );
    expect(builderMedications).toHaveProperty(
      "0.medicationCodeableConcept.text",
      "builder med display"
    );
    expect(builderMedications).toHaveProperty(
      "0.dosage.0.text",
      "builder dosage display"
    );
    expect(otherProviderMedications).toHaveProperty(
      "0.medicationCodeableConcept.coding.0.code",
      "unknown"
    );
  });
});

describe("filterMedicationsWithNoRxNorms", () => {
  test("removes medications with no RxNorm", () => {
    const inputMeds: MedicationStatement[] = [
      {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: "Test",
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: SYSTEM_RXNORM,
              code: "rxnorm-code",
            },
          ],
        },
      },
      {
        resourceType: "MedicationStatement",
        status: "active",
        subject: {
          reference: "Test",
        },
        medicationCodeableConcept: {
          coding: [
            {
              system: "not-rxnorm",
              code: "not-rxnorm",
            },
          ],
        },
      },
    ];

    const bundle: fhir4.Bundle = { type: "document", resourceType: "Bundle" };

    const filteredMeds = filterMedicationsWithNoRxNorms(inputMeds, bundle);

    expect(filteredMeds).toHaveLength(1);

    expect(filteredMeds).toHaveProperty(
      "0.medicationCodeableConcept.coding.0.code",
      "rxnorm-code"
    );
  });
});
