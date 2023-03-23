import { ChevronRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { ReactNode, useState } from "react";
import { DetailsCard } from "./details-card";
import { DocumentIcon } from "@/components/core/document-icon";

export type DetailEntry = {
  label: string;
  value: ReactNode;
};

export type HistoryEntryProps = {
  id: string;
  date?: string;
  title?: string;
  subtitle?: string;
  details: DetailEntry[];
  hideEmpty?: boolean;
  documentButton?: ReactNode;
  binaryId?: string;
};

export const HistoryEntry = ({
  date,
  title,
  subtitle,
  details,
  hideEmpty,
  documentButton,
}: HistoryEntryProps) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div
      className="ctw-collapsible-data-list ctw-space-y-1"
      data-zus-telemetry-namespace="CollapsibleDataList"
    >
      <DetailSummary
        date={date}
        title={title}
        subtitle={subtitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
        hasDocument={!!documentButton}
      />
      {isDetailShown && (
        <DetailsCard
          details={details}
          hideEmpty={hideEmpty}
          documentButton={documentButton}
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
}: {
  date?: string;
  title?: string;
  subtitle?: string;
  isDetailShown: boolean;
  hasDocument?: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button
    type="button"
    aria-label="details"
    onClick={() => setIsDetailShown(!isDetailShown)}
    data-zus-telemetry-namespace="DetailSummary"
    data-zus-telemetry-click={isDetailShown ? "Collapse" : "Expand"}
    className="ctw-w-full ctw-cursor-pointer ctw-border-none ctw-bg-transparent ctw-p-0 ctw-text-base ctw-outline-none"
  >
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark">
      <div className="ctw-flex ctw-space-x-3">
        {date && <div className="ctw-min-w-[5rem]">{date}</div>}
        <div>
          <div className="ctw-font-semibold ctw-text-content-black">
            {title}
          </div>
          <div className="ctw-text-content-light">{subtitle}</div>
        </div>
      </div>
      <div className="ctw-flex ctw-items-center ctw-space-x-3">
        {hasDocument && (
          <DocumentIcon
            className="ctw-fill-content-light hover:ctw-fill-content-light"
            height={16}
          />
        )}
        <div className="ctw-justify-right ctw-flex">
          <ChevronRightIcon
            className={cx("ctw-h-5 ctw-w-5 ctw-text-primary-dark", {
              "ctw-rotate-90": isDetailShown,
            })}
          />
        </div>
      </div>
    </div>
  </button>
);
