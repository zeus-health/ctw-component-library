import { useState } from "react";
import {
  CollapsibleDataList,
  CollapsibleDataListProps,
} from "./collapsible-data-list";

export type CollapsibleDataListStackEntries = CollapsibleDataListProps[];

export type CollapsibleListProp = {
  entries: CollapsibleDataListStackEntries;
  limit?: number;
};

export const CollapsibleDataListStack = ({
  entries,
  limit,
}: CollapsibleListProp) => {
  const [showAll, setShowAll] = useState(!limit || entries.length <= limit);
  const displayedEntries =
    showAll || !limit ? entries : entries.slice(0, limit);
  return (
    <div
      className="ctw-space-y-3"
      data-zus-telemetry-namespace="CollapsibleDataListStack"
    >
      <div className="ctw-text-base ctw-font-medium ctw-uppercase ctw-text-content-light">
        History
      </div>
      {displayedEntries.map((entry, idx) => (
        // We can have multiple items with the same condition id
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${entry.id}-${idx}`}>
          <CollapsibleDataList
            id={entry.id}
            date={entry.date}
            title={entry.title}
            subtitle={entry.subtitle}
            data={entry.data}
            hideEmpty={entry.hideEmpty}
            documentButton={entry.documentButton}
            binaryId={entry.binaryId}
          />
        </div>
      ))}
      {!showAll && (
        <div className="ctw-text-center">
          <button
            type="button"
            className="ctw-btn-primary"
            onClick={() => setShowAll(true)}
          >
            {/* We know limit must be set if showAll is false. */}
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            Load {entries.length - limit!} More
          </button>
        </div>
      )}
    </div>
  );
};
