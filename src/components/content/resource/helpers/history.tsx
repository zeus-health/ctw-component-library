import { useState } from "react";
import { HistoryEntry, HistoryEntryProps } from "./history-entry";
import { orderBy } from "@/utils/nodash";

export type HistoryEntries = HistoryEntryProps[];

export type HistoryProps = {
  entries: HistoryEntries;
  limit?: number;
  resourceTypeTitle: string;
};

export const History = ({ entries, limit, resourceTypeTitle }: HistoryProps) => {
  const [showAll, setShowAll] = useState(!limit || entries.length <= limit);

  // Sort by date descending, then by version descending
  // We convert the date string to a Date object so that
  // it sorts correctly.
  const sortedEntries = orderBy(
    entries,
    [(e) => (e.date ? new Date(e.date) : ""), "versionId"],
    ["desc", "desc"]
  );

  const displayedEntries = showAll || !limit ? sortedEntries : sortedEntries.slice(0, limit);

  return (
    <div className="ctw-space-y-4" data-zus-telemetry-namespace="History">
      <div className="ctw-text-lg ctw-font-semibold">History</div>
      {displayedEntries.map((entry, idx) => (
        // We can have multiple items with the same condition id
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${entry.id}-${idx}`}>
          <HistoryEntry
            id={entry.id}
            date={entry.date}
            title={entry.title}
            subtitle={entry.subtitle}
            details={entry.details}
            hideEmpty={entry.hideEmpty}
            binaryId={entry.binaryId}
            resourceTypeTitle={resourceTypeTitle}
          />
        </div>
      ))}
      {!showAll && (
        <div className="ctw-text-center">
          <button type="button" className="ctw-btn-primary" onClick={() => setShowAll(true)}>
            {/* We know limit must be set if showAll is false. */}
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            Load {sortedEntries.length - limit!} More
          </button>
        </div>
      )}
    </div>
  );
};
