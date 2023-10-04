import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";
import { DetailEntry, DetailsCard } from "./details-card";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";

export type NotesEntrySimpleProps = {
  details: DetailEntry;
  hideEmpty?: boolean;
  id: string;
  subtitle?: string;
  title?: string;
  versionId?: string;
  isDetailShownOnOpen?: boolean;
};

type Props = NotesEntrySimpleProps;

export const NotesEntrySimple = ({ details, hideEmpty, title, isDetailShownOnOpen }: Props) => {
  const [isDetailShown, setIsDetailShown] = useState(isDetailShownOnOpen);

  return (
    <div className="ctw-space-y-1">
      <NoteSummary
        collapsedRender={
          <>
            {title && (
              <div>
                <div className="ctw-font-semibold ctw-text-content-black">{title}</div>
              </div>
            )}
            {!title && <div className="ctw-text-content-lighter">Unknown</div>}
          </>
        }
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <DetailsCard details={[details]} hideEmpty={hideEmpty} />}
    </div>
  );
};

export const NotesEntry = ({ details, hideEmpty, title, isDetailShownOnOpen }: Props) => {
  const [isDetailShown, setIsDetailShown] = useState(isDetailShownOnOpen ?? false);

  return (
    <div className="ctw-space-y-1">
      <NoteSummary
        collapsedRender={
          <>
            {title && (
              <div>
                <div className="ctw-font-semibold ctw-text-content-black">{title}</div>
              </div>
            )}
            {!title && <div className="ctw-text-content-lighter">Unknown</div>}
          </>
        }
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <DetailsCard details={[details]} hideEmpty={hideEmpty} />}
    </div>
  );
};

export const NoteSummary = ({
  collapsedRender,
  isDetailShown,
  setIsDetailShown,
}: {
  collapsedRender?: ReactNode;
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
        <div className="ctw-flex ctw-grow ctw-space-x-3">{collapsedRender}</div>
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
