import { ConditionModel } from "@/fhir/models";

// Filter out other conditions where:
//  1. Condition is archived and includeArchived is false.
//  2. CCS Category code starts with FAC or XXX.
//  3. There is an existing patient condition with a matching known code.
//     AND The other condition is older than the patient condition OR they
//     have the same status.
export const filterOtherConditions = (
  otherConditions: ConditionModel[],
  patientConditions: ConditionModel[],
  includeArchived: boolean
): ConditionModel[] =>
  otherConditions.filter((otherCondition) => {
    if (otherCondition.isArchived && !includeArchived) return false;

    if (["FAC", "XXX"].includes(otherCondition.ccsChapterCode ?? "")) {
      return false;
    }

    return !patientConditions.some((patientCondition) => {
      const otherRecordedDate = otherCondition.resource.recordedDate;
      const patientRecordedDate = patientCondition.resource.recordedDate;
      const isMatch = otherCondition.knownCodingsMatch(patientCondition);
      const isEnteredInError =
        patientCondition.verificationStatus === "entered-in-error";

      const isOlder =
        !otherRecordedDate ||
        (patientRecordedDate && otherRecordedDate <= patientRecordedDate);
      const hasSameStatus =
        otherCondition.clinicalStatus === patientCondition.clinicalStatus;

      return isMatch && !isEnteredInError && (isOlder || hasSameStatus);
    });
  });
