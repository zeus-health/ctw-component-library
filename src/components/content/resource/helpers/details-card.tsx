import type { DetailEntry } from "./history-entry";
import { PencilIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";

export type DetailsProps = {
  hideEmpty?: boolean;
  details: DetailEntry[];
  readOnly?: boolean;
  onEdit?: () => void;
  documentButton?: ReactNode;
};

export const DetailsCard = ({
  details,
  hideEmpty = true,
  readOnly = true,
  onEdit,
  documentButton,
}: DetailsProps) => (
  <div
    className="ctw-rounded-lg ctw-bg-bg-lighter"
    data-zus-telemetry-namespace="Details"
  >
    <dl className="ctw-space-y-2 ctw-p-4">
      <div className="ctw-flex ctw-justify-between ctw-space-x-2 ctw-text-sm ctw-uppercase ctw-text-content-light">
        <div className="ctw-title-container">Details</div>
        <div className="ctw-flex">
          {documentButton}
          {!readOnly && (
            <button
              type="button"
              className="ctw-btn-default ctw-flex ctw-space-x-2 ctw-align-middle"
              onClick={onEdit}
              data-zus-telemetry-click="Update"
            >
              <PencilIcon className="ctw-h-4 ctw-w-4" />
              <span>Update</span>
            </button>
          )}
        </div>
      </div>
      {details
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
