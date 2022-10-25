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

  console.log("entries", entries);

  return (
    <div className="ctw-space-y-3">
      {entries.map((entry) => (
        <div key={`${entry.id}`}>
          <CollapsibleDataList
            id={entry.id}
            date={entry.date}
            title={entry.title}
            subTitle={entry.subTitle}
            data={entry.data}
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
