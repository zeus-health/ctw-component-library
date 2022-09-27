import { ConditionModel } from "@/models/conditions";
import { ChevronRightIcon } from "@heroicons/react/outline";

export type ConditionHistoryDetailCardProp = {
  condition: ConditionModel;
};

export function ConditionHistoryDetailCard({
  condition,
}: ConditionHistoryDetailCardProp) {
  return (
    <ul className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y">
      <div className="ctw-min-w-0 ctw-flex-1">
        <p className="ctw-text-primary-700 ctw-truncate ctw-text-sm ctw-font-medium">
          {condition.verificationStatus}
        </p>
        <p className="ctw-text-gray-500 ctw-truncate ctw-text-sm">
          {condition.snomedDisplay}
        </p>
        <p className="ctw-text-gray-500 ctw-truncate ctw-text-sm">
          {condition.recorder}
        </p>
      </div>
      <div className="ctw-text-gray-500 ctw-inline-flex ctw-items-center">
        <ChevronRightIcon className="ctw-h-5 ctw-w-5" />
      </div>
    </ul>
  );
}
