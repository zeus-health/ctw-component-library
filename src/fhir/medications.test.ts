import { MedicationStatement } from "fhir/r4";
import { getMedicationDisplayName } from "./medication";
import { filterMedicationsWithNoRxNorms, splitMedications } from "./medications";
import { SYSTEM_RXNORM } from "./system-urls";
import { MedicationStatementModel } from "@/fhir/models";

describe("splitSummarizedMedications", () => {
  test("splits medications correctly", () => {
    const lensMeds = [
      new MedicationStatementModel({
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
      }),
      new MedicationStatementModel({
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
      }),
    ];

    const builderMeds = [
      new MedicationStatementModel({
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
      }),
    ];

    const { builderMedications, otherProviderMedications } = splitMedications(
      lensMeds,
      builderMeds
    );

    expect(builderMedications).toHaveLength(1);
    expect(otherProviderMedications).toHaveLength(1);

    expect(builderMedications).toHaveProperty(
      "0.resource.medicationCodeableConcept.coding.0.code",
      "known"
    );
    expect(builderMedications).toHaveProperty(
      "0.resource.medicationCodeableConcept.text",
      "builder med display"
    );
    expect(builderMedications).toHaveProperty("0.resource.dosage.0.text", "builder dosage display");
    expect(otherProviderMedications).toHaveProperty(
      "0.resource.medicationCodeableConcept.coding.0.code",
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

    expect(filteredMeds).toHaveProperty("0.medicationCodeableConcept.coding.0.code", "rxnorm-code");
  });
});

describe("getMedicationDisplayName", () => {
  test("prefers RxNorm codes", () => {
    const med: fhir4.MedicationStatement = {
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
            display: "test",
          },
          {
            system: "system",
            code: "code",
            display: "display",
          },
        ],
      },
    };

    const displayName = getMedicationDisplayName(med);

    expect(displayName).toBe("test");
  });

  test("falls back to first available display value", () => {
    const med: fhir4.MedicationStatement = {
      resourceType: "MedicationStatement",
      status: "active",
      subject: {
        reference: "Test",
      },
      medicationCodeableConcept: {
        coding: [
          {
            system: "system1",
            code: "code1",
          },
          {
            system: "system2",
            code: "code2",
            display: "display",
          },
        ],
      },
    };

    const displayName = getMedicationDisplayName(med);

    expect(displayName).toBe("display");
  });
});
