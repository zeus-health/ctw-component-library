import type { CollapsibleDataListEntry } from "./collapsible-data-list";
import { PencilIcon } from "@heroicons/react/solid";
import expandArrows from "../../assets/expand-arrows.svg";
import { CCDAModal } from "./modal-ccda";

type DetailsProps = {
  hideEmpty?: boolean;
  data: CollapsibleDataListEntry[];
  readOnly?: boolean;
  onEdit?: () => void;
  document?: Document;
};

export const Details = ({
  data,
  hideEmpty = true,
  onEdit,
  document,
}: DetailsProps) => (
  <div className="ctw-rounded-lg ctw-bg-bg-lighter">
    <dl className="ctw-space-y-2 ctw-p-4">
      <div className="ctw-flex ctw-justify-between ctw-space-x-2 ctw-text-sm ctw-uppercase ctw-text-content-light">
        <div className="ctw-title-container">Details</div>
        <div className="ctw-flex">
          <button
            type="button"
            className="ctw-btn-default ctw-flex ctw-space-x-2 ctw-align-middle"
          >
            <div> Source Document</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height={12}
              className="ctw-mt-1"
            >
              <path d="M352 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L297.4 169.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H352zM214.6 297.4c-12.5-12.5-32.8-12.5-45.3 0L64 402.7V352c0-17.7-14.3-32-32-32s-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3L214.6 342.6c12.5-12.5 12.5-32.8 0-45.3z" />
            </svg>
          </button>
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
