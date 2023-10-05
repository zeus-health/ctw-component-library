import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";
import { DetailEntry, DetailsCard } from "./details-card";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";

export type NotesEntryProps = {
  details: DetailEntry[];
  hideEmpty?: boolean;
  id?: string;
  summary?: ReactNode;
  versionId?: string;
  isDetailShownOnOpen?: boolean;
  documentButton?: ReactNode;
};

type Props = NotesEntryProps;

export const NotesEntry = ({
  details,
  hideEmpty,
  summary,
  isDetailShownOnOpen = false,
  documentButton,
}: Props) => {
  const [isDetailShown, setIsDetailShown] = useState(isDetailShownOnOpen);

  return (
    <div className="ctw-space-y-1">
      <NoteSummary
        summary={summary}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && (
        <DetailsCard details={details} hideEmpty={hideEmpty} documentButton={documentButton} />
      )}
    </div>
  );
};

export const NoteSummary = ({
  summary,
  isDetailShown,
  setIsDetailShown,
}: {
  summary?: ReactNode;
  isDetailShown: boolean;
  setIsDetailShown: Dispatch<SetStateAction<boolean>>;
}) => {
  const { trackInteraction } = useAnalytics();
  return (
    <button
      type="button"
      aria-label="details"
      className="ctw-btn-clean"
      onClick={() => {
        trackInteraction("toggle_note", {
          action: isDetailShown ? "collapse_note" : "expand_note",
        });
        return setIsDetailShown(!isDetailShown);
      }}
    >
      <div className="ctw-flex ctw-items-center ctw-justify-between ctw-space-x-4 ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark">
        <div className="ctw-flex ctw-grow ctw-space-x-3">{summary}</div>
        <div className="ctw-flex ctw-items-center ctw-space-x-3">
          <div className="ctw-justify-right ctw-flex">
            <FontAwesomeIcon
              icon={faChevronRight}
              className={cx("ctw-h-3 ctw-w-3 ctw-text-content-lighter", {
                "ctw-rotate-90": isDetailShown,
              })}
            />
          </div>
        </div>
      </div>
    </button>
  );
};
