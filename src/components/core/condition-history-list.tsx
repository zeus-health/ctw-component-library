import { ReactNode, useState } from "react";
import { CollapsibleDataList } from "./collapsible-data-list";

export type DataListStackEntry = {
  id: string;
  code?: string;
  ccs?: string;
  date?: string;
  title?: string;
  subTitle?: string;
  data: Record<string, ReactNode>[];
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
          <div className="ctw-pad-6 ctw-flex ctw-space-x-10 ctw-space-y-10 ctw-text-2xl ctw-text-black">
            {entry.title} ({entry.code})
          </div>
          <div className="ctw-flex ctw-p-0 ctw-text-sm ctw-text-black">
            {entry.ccs}
          </div>
          <CollapsibleDataList
            id={entry.id}
            date={entry.date}
            title={entry.title}
            subTitle={entry.subTitle}
            data={entry.data}
          />
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
    </>
  );
};
