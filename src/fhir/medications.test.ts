import { MedicationStatement } from "fhir/r4";
import { splitSummarizedMedications } from "./medications";
import { SYSTEM_RXNORM } from "./system-urls";

describe("splitSummarizedMedications", () => {
  test("splits medications correctly", () => {
    const summarizedMeds: MedicationStatement[] = [
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
        },
      },
    ];

    const { builderMedications, otherProviderMedications } =
      splitSummarizedMedications(summarizedMeds, builderMeds);

    expect(builderMedications).toHaveLength(1);
    expect(otherProviderMedications).toHaveLength(1);

    expect(builderMedications).toHaveProperty(
      "0.medicationCodeableConcept.coding.0.code",
      "known"
    );
    expect(otherProviderMedications).toHaveProperty(
      "0.medicationCodeableConcept.coding.0.code",
      "unknown"
    );
  });
});
