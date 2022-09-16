import { useState } from "react";
import type { DataListEntry } from "./data-list";

export type DataListStackEntry = { id: string; data: DataListEntry[] };
export type DataListStackEntries = DataListStackEntry[];

export type DataListStackProps = {
  entries: DataListStackEntries;
  limit?: number;
};

export function DataListStack({ entries, limit }: DataListStackProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedEntries =
    showAll || !limit ? entries : entries.slice(0, limit);

  return (
    <div className="ctw-divide-gray-200 ctw-space-y-4">
      <div className="ctw-divide-y ctw-rounded-lg ctw-border">
        {displayedEntries.map((entry) => (
          <dl className="ctw-space-y-2 ctw-p-4" key={entry.id}>
            {entry.data.map(({ label, value }, labelIndex) => (
              <div
                // label is not guarenteed to be unique so append index.
                // eslint-disable-next-line react/no-array-index-key
                key={label + labelIndex}
                className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
              >
                <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
                  {label}:
                </dt>
                <dd className="ctw-flex-grow">{value || ""}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>

      {!showAll && limit && entries.length > limit && (
        <div className="ctw-text-center">
          <button
            type="button"
            className="ctw-link-primary"
            onClick={() => setShowAll(true)}
          >
            Load {entries.length - limit} More
          </button>
        </div>
      )}
    </div>
  );
}
