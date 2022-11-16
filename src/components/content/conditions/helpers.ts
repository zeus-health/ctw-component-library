import { ConditionModel } from "@/fhir/models";

// Filter out other conditions where:
//  1. There is an existing patient condition with a matching known code.
//  2. The other condition is older than the patient condition OR they
//     have the same status.
export const filterOtherConditions = (
  otherConditions: ConditionModel[],
  patientConditions: ConditionModel[]
): ConditionModel[] =>
  otherConditions.filter(
    (otherCondition) =>
      !patientConditions.some((patientCondition) => {
        const otherRecordedDate = otherCondition.resource.recordedDate;
        const patientRecordedDate = patientCondition.resource.recordedDate;
        const isMatch = otherCondition.knownCodingsMatch(patientCondition);
        const isOlder =
          !otherRecordedDate ||
          (patientRecordedDate && otherRecordedDate <= patientRecordedDate);
        const hasSameStatus =
          otherCondition.clinicalStatus === patientCondition.clinicalStatus;

        return isMatch && (isOlder || hasSameStatus);
      })
  );
