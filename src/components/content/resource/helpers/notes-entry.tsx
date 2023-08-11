import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { DetailEntry, DetailsCard } from "./details-card";
import { Telemetry } from "@/utils/telemetry";

export type NotesEntryProps = {
  details: DetailEntry;
  hideEmpty?: boolean;
  id: string;
  subtitle?: string;
  title?: string;
  versionId?: string;
};

type Props = NotesEntryProps;

export const NotesEntry = ({ details, hideEmpty, title }: Props) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-space-y-1">
      <NoteSummary
        title={title}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <DetailsCard details={[details]} hideEmpty={hideEmpty} />}
    </div>
  );
};

export const NoteSummary = ({
  title,
  isDetailShown,
  setIsDetailShown,
}: {
  title?: string;
  isDetailShown: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button
    type="button"
    aria-label="details"
    onClick={() => {
      Telemetry.trackInteraction(isDetailShown ? "collapse_note" : "expand_note");
      setIsDetailShown(!isDetailShown);
    }}
    className="ctw-btn-clean"
  >
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark">
      <div className="ctw-flex ctw-space-x-3">
        {title && (
          <div>
            <div className="ctw-font-semibold ctw-text-content-black">{title}</div>
          </div>
        )}
        {!title && <div className="ctw-text-content-lighter">Unknown</div>}
      </div>
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
