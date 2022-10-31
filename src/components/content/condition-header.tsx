import { ConditionModel } from "@/models/condition";

type ConditionHeaderProp = {
  condition: ConditionModel;
};

export const ConditionHeader = ({ condition }: ConditionHeaderProp) => (
  <div className="ctw-py-2">
    <div className="ctw-text-2xl">
      {condition.display} ({condition.preferredCoding?.code})
    </div>
    <div className="ctw-text-sm">{condition.ccsGrouping}</div>
  </div>
);
