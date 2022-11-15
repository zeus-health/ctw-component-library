import { clone } from "lodash";
import { ConditionModel } from "./condition";

describe("FHIR Model: Condition", () => {
  describe("active", () => {
    test("should return true or false correctly for different clinical statuses", () => {
      const condition = getCondition();

      ["active", "recurrence", "relapse"].forEach((status) => {
        condition.resource.clinicalStatus = { coding: [{ code: status }] };
        expect(condition.active).toBeTruthy();
      });

      ["inactive", "remission", "resolved"].forEach((status) => {
        condition.resource.clinicalStatus = { coding: [{ code: status }] };
        expect(condition.active).toBeFalsy();
      });
    });
  });

  describe("knownCodingsMatch", () => {
    test("should return true with matching ICD10", () => {
      const condition2 = getCondition();
      condition2.resource.code = { coding: [decoy, burntEarICD10] };
      expect(condition.knownCodingsMatch(condition2)).toBeTruthy();
      expect(condition2.knownCodingsMatch(condition)).toBeTruthy();
    });

    test("should return true with matching snomed with different display", () => {
      const condition2 = getCondition();
      const snomed = clone(burntEarSnomed);
      snomed.display = "Different display";
      condition2.resource.code = {
        coding: [burntEarSnomed, decoy, otherSnomed],
      };
      expect(condition.knownCodingsMatch(condition2)).toBeTruthy();
      expect(condition2.knownCodingsMatch(condition)).toBeTruthy();
    });

    test("should return false when only matching custom system (nont known coding)", () => {
      const condition2 = getCondition();
      condition2.resource.code = {
        coding: [decoy, burntEarCustom, otherSnomed],
      };
      expect(condition.knownCodingsMatch(condition2)).toBeFalsy();
      expect(condition2.knownCodingsMatch(condition)).toBeFalsy();
    });

    const burntEarICD10 = {
      system: "http://hl7.org/fhir/sid/icd-10",
      code: "T20.31",
      display: "Burn of third degree of ear",
    };
    const burntEarSnomed = {
      system: "http://snomed.info/sct",
      code: "39065001",
      display: "Burn of ear",
    };
    const burntEarCustom = {
      system: "http://example.com/custom",
      code: "12345",
      display: "Burn of ear",
    };
    const otherSnomed = {
      system: "http://snomed.info/sct",
      code: "12345",
      display: "Fake snomed",
    };
    const decoy = {
      system: "http://example.com/decoy",
      code: "39065001", // happens to have same burnt ear code.
      display: "This shouldn't cause matches!",
    };

    const condition = getCondition();
    condition.resource.code = {
      coding: [burntEarICD10, burntEarSnomed, burntEarCustom],
    };
  });

  function getCondition() {
    return new ConditionModel({
      resourceType: "Condition",
      subject: { display: "Bob" },
    });
  }
});
