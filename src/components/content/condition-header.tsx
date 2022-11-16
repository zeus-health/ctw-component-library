import { ConditionModel } from "@/fhir/models/condition";
import { ReactNode } from "react";

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

export const ConditionHeaderSummary = ({
  children,
}: {
  children: ReactNode;
}) => <div className="ctw-pt-0 ctw-text-base">{children}</div>;
