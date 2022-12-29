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
  return (
    <div className="ctw-space-y-3">
      <div className="ctw-text-base ctw-font-medium ctw-uppercase ctw-text-content-light">
        History
      </div>
      {entries.map((entry) => (
        <div key={`${entry.id}`}>
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
            className="ctw-link-primary"
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
