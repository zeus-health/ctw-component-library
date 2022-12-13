import { pick } from "lodash/fp";
import { sortMedHistory } from "./helpers";
import { MedicationModel } from "@/fhir/models";

describe("Medication Helpers", () => {
  describe("sortMedHistory", () => {
    it("should order by date", () => {
      // Nothing complicated in this test. We want to see that our sort function
      // puts the medication models in order by datetime.
      const datesInOrder = [
        "2022-09-23 10:00:00",
        "2022-09-28 10:00:00",
        "2022-09-28 11:00:00",
        "2022-10-03 10:00:00",
        "2022-10-03 17:00:00",
        "2022-11-20 18:00:00",
        "2022-11-20 19:00:00",
      ];
      const medications: MedicationModel[] = [
        createDummyMedication("MedicationDispense", datesInOrder[0]),
        createDummyMedication("MedicationRequest", datesInOrder[1]),
        createDummyMedication("MedicationAdministration", datesInOrder[2]),
        createDummyMedication("MedicationDispense", datesInOrder[3]),
        createDummyMedication("MedicationStatement", datesInOrder[4]),
        createDummyMedication("MedicationRequest", datesInOrder[5]),
        createDummyMedication("MedicationStatement", datesInOrder[6]),
      ];

      const sorted = sortMedHistory(medications);
      expect(sorted.map(pick(["resourceType", "date"]))).toEqual([
        { resourceType: "MedicationStatement", date: datesInOrder[6] },
        { resourceType: "MedicationRequest", date: datesInOrder[5] },
        { resourceType: "MedicationStatement", date: datesInOrder[4] },
        { resourceType: "MedicationDispense", date: datesInOrder[3] },
        { resourceType: "MedicationAdministration", date: datesInOrder[2] },
        { resourceType: "MedicationRequest", date: datesInOrder[1] },
        { resourceType: "MedicationDispense", date: datesInOrder[0] },
      ]);
    });

    it("should ignore time when sorting request/dispense", () => {
      // This test is more complex. We want to see that our sort function can
      // reorder medication models from the same date if the same medication
      // was filled before it was ordered that day (as that makes no sense).
      const medicationA = [{ code: "123", system: "example.com" }];
      const medicationB = [{ code: "456", system: "example.com" }];
      const medications: MedicationModel[] = [
        // The request for medicationA was recorded 10 hours after dispense
        createDummyMedication(
          "MedicationRequest",
          "2022-08-12 20:00:00",
          medicationA
        ),
        createDummyMedication(
          "MedicationDispense",
          "2022-08-12 10:00:00",
          medicationA
        ),
        // The request for medicationB is also out of order on same day
        createDummyMedication(
          "MedicationRequest",
          "2022-08-12 19:00:00",
          medicationB
        ),
        createDummyMedication(
          "MedicationDispense",
          "2022-08-12 08:00:00",
          medicationB
        ),
        createDummyMedication("MedicationStatement", "2022-08-12 19:00:00"),
      ];

      const sorted = sortMedHistory(medications);
      expect(sorted.map(pick(["resourceType", "date"]))).toEqual([
        { resourceType: "MedicationStatement", date: "2022-08-12 19:00:00" },
        { resourceType: "MedicationDispense", date: "2022-08-12 08:00:00" },
        { resourceType: "MedicationRequest", date: "2022-08-12 19:00:00" },
        { resourceType: "MedicationDispense", date: "2022-08-12 10:00:00" },
        { resourceType: "MedicationRequest", date: "2022-08-12 20:00:00" },
      ]);
    });
  });

  it("should not reorder request/dispense from different days", () => {
    // This test has out of order dispense then request, but we don't expect it
    // to reorder them because they happen different dates. We likely won't see
    // this happen, it's more to test the logic of the function.
    const medicationA = [{ code: "123", system: "example.com" }];
    const medicationB = [{ code: "456", system: "example.com" }];
    const medications: MedicationModel[] = [
      // The request for medicationA was recorded 10 hours after dispense
      createDummyMedication(
        "MedicationRequest",
        "2022-08-12 20:00:00",
        medicationA
      ),
      createDummyMedication(
        "MedicationDispense",
        "2022-08-11 10:00:00",
        medicationA
      ),
      // The request for medicationB is also out of order on same day
      createDummyMedication(
        "MedicationRequest",
        "2022-08-12 19:00:00",
        medicationB
      ),
      createDummyMedication(
        "MedicationDispense",
        "2022-08-11 08:00:00",
        medicationB
      ),
    ];

    const sorted = sortMedHistory(medications);
    expect(sorted.map(pick(["resourceType", "date"]))).toEqual([
      { resourceType: "MedicationRequest", date: "2022-08-12 19:00:00" },
      { resourceType: "MedicationRequest", date: "2022-08-12 20:00:00" },
      { resourceType: "MedicationDispense", date: "2022-08-11 08:00:00" },
      { resourceType: "MedicationDispense", date: "2022-08-11 10:00:00" },
    ]);
  });
});

function createDummyMedication(
  resourceType: string,
  date: string,
  coding: { system: string; code: string }[] = []
): MedicationModel {
  switch (resourceType) {
    case "MedicationRequest":
      return new MedicationModel({
        resourceType: "MedicationRequest",
        intent: "order",
        status: "active",
        authoredOn: date,
        subject: {},
        medicationCodeableConcept: { coding },
      });
    case "MedicationDispense":
      return new MedicationModel({
        resourceType: "MedicationDispense",
        status: "completed",
        whenHandedOver: date,
        medicationCodeableConcept: { coding },
      });
    case "MedicationAdministration":
      return new MedicationModel({
        id: "09876",
        resourceType: "MedicationAdministration",
        status: "in-progress",
        subject: {},
        effectivePeriod: {
          start: date,
        },
      });
    case "MedicationStatement":
      return new MedicationModel({
        resourceType: "MedicationStatement",
        status: "active",
        subject: {},
        dateAsserted: date,
      });
    default:
      throw new Error(`Unrecognized Medication type ${resourceType}`);
  }
}
