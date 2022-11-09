import { ConditionModel } from "@/models";
import { filterOtherConditions } from "./helpers";

describe("Condition Helpers", () => {
  describe("filterOtherConditions", () => {
    it("should filter out when there's a match and other record has no date", () => {
      const { others, patients } = setupConditions();
      const filtered = filterOtherConditions(others, patients);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toEqual("other2");
      expect(filtered[1].id).toEqual("other3");
    });

    it("should filter out when there's a match and patient record is newer", () => {
      const { others, patients } = setupConditions("2022-11-09", "2022-11-10");
      const filtered = filterOtherConditions(others, patients);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toEqual("other2");
      expect(filtered[1].id).toEqual("other3");
    });

    it("should NOT filter out when there's a match and patient record is older", () => {
      const { others, patients } = setupConditions("2022-11-10", "2022-11-09");
      const filtered = filterOtherConditions(others, patients);
      expect(filtered).toHaveLength(3);
    });

    function getCondition(id: string) {
      return new ConditionModel({
        id,
        resourceType: "Condition",
        subject: { display: "Sarah" },
      });
    }

    function setupConditions(
      otherRecordedDate?: string,
      patientRecordedDate?: string
    ) {
      const burntEarSnomed = {
        system: "http://snomed.info/sct",
        code: "39065001",
        display: "Burn of ear",
      };

      const otherCondition = getCondition("other");
      otherCondition.resource.code = {
        coding: [burntEarSnomed],
      };
      otherCondition.resource.recordedDate = otherRecordedDate;

      const patientCondition = getCondition("patient");
      patientCondition.resource.code = {
        coding: [burntEarSnomed],
      };
      patientCondition.resource.recordedDate = patientRecordedDate;

      const others = [
        getCondition("other2"),
        otherCondition,
        getCondition("other3"),
      ];
      const patients = [
        getCondition("patient2"),
        patientCondition,
        getCondition("patient3"),
      ];
      return { others, patients };
    }
  });
});
