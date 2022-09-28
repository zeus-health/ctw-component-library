import { useState } from "react";
import { CollapsibleDataList } from "./collapsible-data-list";
import { DataListEntry } from "./data-list";

export type DataListStackEntry = {
  id: string;
  detailData: DataListEntry[];
  previewData: DataListEntry[];
};
export type DataListStackEntries = DataListStackEntry[];

export type CollapsibleListProp = {
  entries: DataListStackEntries;
  limit?: number;
};

export const ConditionHistoryList = ({
  entries,
  limit,
}: CollapsibleListProp) => {
  const [showAll, setShowAll] = useState(false);

  const displayedEntries =
    showAll || !limit ? entries : entries.slice(0, limit);

  return (
    <>
      {entries.map((entry) => (
        <>
          <CollapsibleDataList entry={entry} />
        </>
      ))}
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
      ;
    </>
  );
};
