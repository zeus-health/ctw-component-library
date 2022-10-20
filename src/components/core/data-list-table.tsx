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
    <div className="space-y-4">
      <div className="divide-y rounded-lg border">
        {displayedEntries.map((entry) => (
          <dl className="space-y-2 p-4" key={entry.id}>
            {entry.data.map(({ label, value }, labelIndex) => (
              <div
                // label is not guarenteed to be unique so append index.
                // eslint-disable-next-line react/no-array-index-key
                key={label + labelIndex}
                className="flex items-baseline space-x-4 text-gray-900"
              >
                <dt className="w-1/3 flex-shrink-0 font-medium">{label}:</dt>
                <dd className="flex-grow">{value || ""}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>

      {!showAll && limit && entries.length > limit && (
        <div className="text-center">
          <button
            type="button"
            className="link-primary"
            onClick={() => setShowAll(true)}
          >
            Load {entries.length - limit} More
          </button>
        </div>
      )}
    </div>
  );
}
