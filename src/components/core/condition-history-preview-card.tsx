import { ChevronRightIcon } from "@heroicons/react/solid";

export type StackedCardEntry = {
  recordedDate: string;
  name: string;
  recorder: string;
  isDetailShown: boolean;
  onClick: () => void;
};

export const ConditionHistoryPreviewCard = ({
  recordedDate,
  name,
  recorder,
  isDetailShown,
  onClick,
}: StackedCardEntry) => (
  <ul className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y">
    <button
      type="button"
      onClick={onClick}
      className="ctw-flex ctw-w-full ctw-items-center ctw-space-x-4 ctw-p-4 ctw-text-left ctw-ring-inset"
    >
      <div className="ctw-min-w-0 ctw-flex-1">
        <p className="ctw-text-primary-700 ctw-truncate ctw-text-sm ctw-font-medium">
          {recordedDate}
        </p>
        <p className="ctw-text-gray-500 ctw-truncate ctw-text-sm">{name}</p>
        <p className="ctw-text-gray-500 ctw-truncate ctw-text-sm">{recorder}</p>
      </div>
      <div className="ctw-text-gray-500 ctw-inline-flex ctw-items-center">
        <ChevronRightIcon className="ctw-h-5 ctw-w-5" />
      </div>
    </button>
  </ul>
);
