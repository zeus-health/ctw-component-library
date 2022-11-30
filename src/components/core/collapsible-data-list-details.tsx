import type { CollapsibleDataListEntry } from "./collapsible-data-list";
import { PencilIcon } from "@heroicons/react/solid";

type DetailsProps = {
  hideEmpty?: boolean;
  data: CollapsibleDataListEntry[];
  readOnly?: boolean;
  onEdit?: () => void;
};

export const Details = ({ data, hideEmpty = true, onEdit }: DetailsProps) => (
  <div className="ctw-rounded-lg ctw-bg-bg-lighter">
    <dl className="ctw-space-y-2 ctw-p-4">
      <div className="ctw-flex ctw-justify-between ctw-text-sm ctw-uppercase ctw-text-content-light">
        <div>Details</div>
        {onEdit && (
          <button
            type="button"
            className="ctw-btn-default ctw-flex ctw-space-x-2 ctw-align-middle"
            onClick={onEdit}
          >
            <PencilIcon className="ctw-h-4 ctw-w-4" />
            <span>Update</span>
          </button>
        )}
      </div>
      {data
        .filter((d) => !hideEmpty || d.value || d.value === 0)
        .map(({ label, value }) => (
          <div
            key={label}
            className="ctw-text-gray-900 ctw-flex ctw-items-baseline"
          >
            <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
              {label}
            </dt>
            <dd className="ctw-m-0">{value}</dd>
          </div>
        ))}
    </dl>
  </div>
);
