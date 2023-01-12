import { clone } from "lodash";
import { SYSTEM_CONDITION_CLINICAL } from "../system-urls";
import { ConditionModel } from "./condition";

const getConditionStatus = (
  verificationStatus: string,
  clinicalStatus: string
) =>
  new ConditionModel({
    resourceType: "Condition",
    verificationStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
          code: verificationStatus,
        },
      ],
    },
    clinicalStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: clinicalStatus,
        },
      ],
    },
    subject: { display: "Bob" },
  }).displayStatus;

describe("FHIR Model: Condition", () => {
  describe("active", () => {
    test("should return true or false correctly for different clinical statuses", () => {
      const condition = getCondition();

      ["active", "recurrence", "relapse"].forEach((status) => {
        condition.resource.clinicalStatus = {
          coding: [{ code: status, system: SYSTEM_CONDITION_CLINICAL }],
        };
        expect(condition.active).toBeTruthy();
      });

      // Should find the right condition by system
      condition.resource.clinicalStatus = {
        text: "Active",
        coding: [
          { code: "foobar" },
          {
            code: "active",
            display: "Active",
            system: SYSTEM_CONDITION_CLINICAL,
          },
          { code: "inactive" },
        ],
      };
      expect(condition.active).toBeTruthy();

      ["inactive", "remission", "resolved"].forEach((status) => {
        condition.resource.clinicalStatus = {
          coding: [{ code: status, system: SYSTEM_CONDITION_CLINICAL }],
        };
        expect(condition.active).toBeFalsy();
      });
    });
  });

  describe("displayStatus", () => {
    test("displayStatus should show correct status", () => {
      expect(getConditionStatus("unconfirmed", "active")).toBe("Pending");
      expect(getConditionStatus("unconfirmed", "recurrence")).toBe("Pending");
      expect(getConditionStatus("unconfirmed", "relapse")).toBe("Pending");
      expect(getConditionStatus("differential", "active")).toBe("Pending");
      expect(getConditionStatus("differential", "recurrence")).toBe("Pending");
      expect(getConditionStatus("differential", "relapse")).toBe("Pending");
      expect(getConditionStatus("provisional", "active")).toBe("Pending");
      expect(getConditionStatus("provisional", "recurrence")).toBe("Pending");
      expect(getConditionStatus("provisional", "relapse")).toBe("Pending");
      expect(getConditionStatus("unconfirmed", "inactive")).toBe("Select One");
      expect(getConditionStatus("unconfirmed", "remission")).toBe("Select One");
      expect(getConditionStatus("unconfirmed", "resolved")).toBe("Select One");
      expect(getConditionStatus("refuted", "active")).toBe("Select One");
      expect(getConditionStatus("refuted", "recurrence")).toBe("Select One");
      expect(getConditionStatus("refuted", "relapse")).toBe("Select One");
      expect(getConditionStatus("differential", "inactive")).toBe("Select One");
      expect(getConditionStatus("differential", "remission")).toBe(
        "Select One"
      );
      expect(getConditionStatus("differential", "resolved")).toBe("Select One");
      expect(getConditionStatus("provisional", "inactive")).toBe("Select One");
      expect(getConditionStatus("provisional", "remission")).toBe("Select One");
      expect(getConditionStatus("provisional", "resolved")).toBe("Select One");
      expect(getConditionStatus("confirmed", "inactive")).toBe("Inactive");
      expect(getConditionStatus("confirmed", "remission")).toBe("Inactive");
      expect(getConditionStatus("confirmed", "resolved")).toBe("Inactive");
      expect(getConditionStatus("confirmed", "active")).toBe("Active");
      expect(getConditionStatus("confirmed", "recurrence")).toBe("Active");
      expect(getConditionStatus("confirmed", "relapse")).toBe("Active");
      expect(getConditionStatus("refuted", "inactive")).toBe("Refuted");
      expect(getConditionStatus("refuted", "remission")).toBe("Refuted");
      expect(getConditionStatus("refuted", "resolved")).toBe("Refuted");
      expect(getConditionStatus("entered-in-error", "")).toBe(
        "Entered in Error"
      );
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
