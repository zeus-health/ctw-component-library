import { useState } from "react";
import { HistoryEntry, HistoryEntryProps } from "./history-entry";
import { Loading } from "@/components/core/loading";
import { FHIRModel } from "@/fhir/models/fhir-model";
import { orderBy } from "@/utils/nodash";
import { UseQueryResultBasic } from "@/utils/request";

export type HistoryEntries = HistoryEntryProps[];

export type HistoryProps<M> = {
  limit?: number;
  getHistory?: (model: M) => UseQueryResultBasic<HistoryEntries | undefined>;
  model: M;
};

const DEFAULT_HISTORY_PAGE_LIMIT = 20;

export function History<T extends fhir4.Resource, M extends FHIRModel<T>>({
  limit = DEFAULT_HISTORY_PAGE_LIMIT,
  getHistory,
  model,
}: HistoryProps<M>) {
  const history = getHistory && getHistory(model);
  const entries: HistoryEntries = history?.data ?? [];
  const [showAll, setShowAll] = useState(!limit || entries.length <= limit);
  const { resourceTypeTitle } = model;

  // Sort entries by:
  //  1. date descending
  //  2. has a source document (binaryId present or not)
  //  3. title ascending
  //  4. subtitle ascending
  //  5. versionId descending (this is to ensure consistent ordering)
  const sortedEntries = orderBy(
    entries,
    [
      // Convert the date string to a Date object so that it sorts correctly.
      (e) => (e.date ? new Date(e.date) : ""), // desc
      // We want to promote entries with a source document to the top.
      (e) => !!e.binaryId, // desc
      "title", // asc
      "subtitle", // asc
      "versionId", // desc
    ],
    ["desc", "desc", "asc", "asc", "desc"]
  );

  const displayedEntries = showAll || !limit ? sortedEntries : sortedEntries.slice(0, limit);

  // {history &&
  //   (history.isLoading ? (
  //     <Loading message="Loading history..." />
  //   ) : (
  //     <History
  //       entries={history.data ?? []}
  //       limit={HISTORY_PAGE_LIMIT}
  //       resourceTypeTitle={model.resourceTypeTitle}
  //     />
  //   ))}

  return history && history.isLoading ? (
    <Loading message="Loading history..." />
  ) : (
    <div className="ctw-space-y-4">
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
}
