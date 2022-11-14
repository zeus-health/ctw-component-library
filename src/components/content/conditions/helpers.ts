import { ConditionModel } from "@/models";

// Filter out other conditions where:
//  1. There is an existing patient condition with a matching known code.
//  2. The patient condition is more recent than the other condition.
export const filterOtherConditions = (
  otherConditions: ConditionModel[],
  patientConditions: ConditionModel[]
): ConditionModel[] =>
  otherConditions.filter(
    (otherCondition) =>
      !patientConditions.some((patientCondition) => {
        const otherRecordedDate = otherCondition.resource.recordedDate;
        const patientRecordedDate = patientCondition.resource.recordedDate;

        return (
          otherCondition.knownCodingsMatch(patientCondition) &&
          (!otherRecordedDate ||
            (patientRecordedDate && otherRecordedDate <= patientRecordedDate))
        );
      })
  );
