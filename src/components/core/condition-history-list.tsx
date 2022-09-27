import { ConditionModel } from "@/models/conditions";
import { useState } from "react";
import { ConditionHistoryDetailPreviewCard } from "./condition-history-detail-preview-card";

// export type DataListStackEntry = { id: string; data: DataListEntry[] };
// export type DataListStackEntries = DataListStackEntry[];

export type ExpandedListStackProps = {
  entries: ConditionModel[];
  limit?: number;
};

export function ConditionHistoryList({
  entries,
  limit,
}: ExpandedListStackProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedEntries =
    showAll || !limit ? entries : entries.slice(0, limit);

  return (
    <div className="ctw-divide-gray-200 ctw-space-y-4">
      <div className="ctw-divide-y ctw-rounded-lg ctw-border">
        {displayedEntries.map((entry) => (
          <dl className="ctw-space-y-2 ctw-p-4" key={entry.id}>
            <ConditionHistoryDetailPreviewCard condition={entry} />
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
