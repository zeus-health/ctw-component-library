import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { DetailEntry, DetailsCard } from "./details-card";
import { DocumentButton } from "../../CCDA/document-button";
import { useCCDAModal } from "../../CCDA/modal-ccda";
import {
  newTrackingDataForComponent,
  TrackingMetadata,
  useAnalytics,
} from "@/components/core/providers/analytics/use-analytics";

export type HistoryEntryProps = {
  binaryId?: string;
  date?: string;
  details: DetailEntry[];
  hideEmpty?: boolean;
  id: string;
  subtitle?: string;
  title?: string;
  versionId?: string;
};

type Props = HistoryEntryProps & { resourceTypeTitle: string; trackingMetadata?: TrackingMetadata };

export const HistoryEntry = ({
  binaryId,
  date,
  details,
  hideEmpty,
  subtitle,
  title,
  resourceTypeTitle,
  trackingMetadata,
}: Props) => {
  const [isDetailShown, setIsDetailShown] = useState(false);
  const openCCDAModal = useCCDAModal();
  const { trackInteraction } = useAnalytics();
  const newTrackingMetadata = newTrackingDataForComponent("history-entry", trackingMetadata);

  return (
    <div className="ctw-space-y-1">
      <DetailSummary
        date={date}
        title={title}
        subtitle={subtitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
        hasDocument={!!binaryId}
        trackingMetadata={newTrackingMetadata}
      />
      {isDetailShown && (
        <DetailsCard
          details={details}
          hideEmpty={hideEmpty}
          documentButton={
            binaryId && (
              <DocumentButton
                onClick={() => {
                  trackInteraction("open_ccda_modal", newTrackingMetadata);
                  void openCCDAModal(binaryId, resourceTypeTitle);
                }}
                text="Source Document"
              />
            )
          }
        />
      )}
    </div>
  );
};

const DetailSummary = ({
  date,
  title,
  subtitle,
  isDetailShown,
  hasDocument = false,
  setIsDetailShown,
  trackingMetadata,
}: {
  date?: string;
  title?: string;
  subtitle?: string;
  isDetailShown: boolean;
  hasDocument?: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
  trackingMetadata?: TrackingMetadata;
}) => {
  const { trackInteraction } = useAnalytics();

  return (
    <button
      type="button"
      aria-label="details"
      onClick={() => {
        setIsDetailShown(!isDetailShown);
        trackInteraction(
          isDetailShown ? "collapse_item" : "expand_item",
          newTrackingDataForComponent("detail-summary", trackingMetadata)
        );
      }}
      className="ctw-btn-clean"
    >
      <div className="ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark">
        <div className="ctw-flex ctw-space-x-3">
          <div className="ctw-min-w-[5rem]">
            {date ?? <span className="ctw-text-content-lighter">Unknown</span>}
          </div>
          {(title || subtitle) && (
            <div>
              <div className="ctw-font-semibold ctw-text-content-black">{title}</div>
              <div className="ctw-text-content-light">{subtitle}</div>
            </div>
          )}
          {/* Show unknown in the title spot if we don't have one AND if we aren't already
            showing "Unknown" in the date spot. */}
          {!title && !subtitle && date && <div className="ctw-text-content-lighter">Unknown</div>}
        </div>
        <div className="ctw-flex ctw-items-center ctw-space-x-3">
          {hasDocument && (
            <FontAwesomeIcon icon={faFileLines} className="ctw-h-5 ctw-text-content-light" />
          )}
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
