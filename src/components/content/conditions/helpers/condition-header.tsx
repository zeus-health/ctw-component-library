import { ConditionModel } from "@/fhir/models/condition";

type ConditionHeaderProp = {
  condition: ConditionModel;
};

export const ConditionHeader = ({ condition }: ConditionHeaderProp) => (
  <div>
    <div className="ctw-text-2xl">
      {condition.display} ({condition.preferredCoding?.code})
    </div>
    <div className="ctw-text-sm">{condition.ccsChapter}</div>
  </div>
);
