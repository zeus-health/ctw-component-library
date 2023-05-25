import { filterOtherConditions } from "./conditions";
import { ConditionModel } from "@/fhir/models";
import { SYSTEM_CONDITION_VERIFICATION_STATUS, SYSTEM_SNOMED } from "@/fhir/system-urls";

describe("FHIR Condition", () => {
  describe("filterOtherConditions", () => {
    it("should filter out when there's a match and other record has no date", () => {
      const { others, patients } = setupConditions();
      const filtered = filterOtherConditions(others, patients, [], false);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toEqual("other2");
      expect(filtered[1].id).toEqual("other3");
    });

    it("should filter out when there's a match and patient record is newer", () => {
      const { others, patients } = setupConditions("2022-11-09", "2022-11-10");
      const filtered = filterOtherConditions(others, patients, [], false);
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toEqual("other2");
      expect(filtered[1].id).toEqual("other3");
    });

    it("should NOT filter out when there's a match and patient record is older", () => {
      const { others, patients } = setupConditions("2022-11-10", "2022-11-09");
      const filtered = filterOtherConditions(others, patients, [], false);
      expect(filtered).toHaveLength(3);
    });

    it("should filter out when there's a match and patient record is older BUT they have same status", () => {
      const { others, patients } = setupConditions("2022-11-10", "2022-11-09", "active", "active");
      const filtered = filterOtherConditions(others, patients, [], false);
      expect(filtered).toHaveLength(2);
    });

    it("should still show up in other conditions if there is an entered-in-error condition in patient record", () => {
      const { others, patients } = setupConditions(
        "2022-11-10",
        "2022-11-09",
        "active",
        "active",
        "entered-in-error"
      );
      const filtered = filterOtherConditions(others, patients, [], false);
      expect(filtered).toHaveLength(3);
    });

    it("should filter out when it's previously been dismissed", () => {
      const { others, patients } = setupConditions(
        "2022-11-10",
        "2022-11-09",
        "active",
        "active",
        "entered-in-error"
      );
      const filtered = filterOtherConditions(
        others,
        patients,
        [
          {
            resourceType: "Basic",
            code: {},
            subject: {
              type: "Condition",
              reference: `Condition/${others[0].id}`,
            },
          },
        ],
        false
      );
      expect(filtered).toHaveLength(2);
    });

    function getCondition(
      id: string,
      status = "active",
      recordedDate?: string,
      code?: fhir4.Coding,
      verificationStatus = "confirmed"
    ) {
      return new ConditionModel({
        id,
        resourceType: "Condition",
        subject: { display: "Sarah" },
        clinicalStatus: { coding: [{ code: status }] },
        recordedDate,
        code: {
          coding: code ? [code] : undefined,
        },
        verificationStatus: {
          coding: [
            {
              system: SYSTEM_CONDITION_VERIFICATION_STATUS,
              code: verificationStatus,
            },
          ],
        },
      });
    }

    function setupConditions(
      otherRecordedDate?: string,
      patientRecordedDate?: string,
      otherStatus = "active",
      patientStatus = "inactive",
      verificationStatus = "confirmed"
    ) {
      const burntEarSnomed = {
        system: SYSTEM_SNOMED,
        code: "39065001",
        display: "Burn of ear",
      };

      const diabetesSnomed = {
        system: SYSTEM_SNOMED,
        code: "73211009",
        display: "Diebetes mellitus",
      };

      const otherCondition = getCondition("other", otherStatus, otherRecordedDate, burntEarSnomed);

      const patientCondition = getCondition(
        "patient",
        patientStatus,
        patientRecordedDate,
        burntEarSnomed
      );

      const others = [
        getCondition("other2"),
        otherCondition,
        getCondition("other3"),
        getCondition("entered-in-error-other", "active", otherRecordedDate, diabetesSnomed),
      ];

      const patients = [
        getCondition("patient2"),
        patientCondition,
        getCondition("patient3"),
        getCondition(
          "entered-in-error-patient",
          "active",
          otherRecordedDate,
          diabetesSnomed,
          verificationStatus
        ),
      ];
      return { others, patients };
    }
  });
});
