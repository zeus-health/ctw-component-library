import { ChevronRightIcon } from "@heroicons/react/outline";

import cx from "classnames";
import { ReactNode, useState } from "react";
import { Details } from "./collapsible-data-list-details";

import "./collapsible-data-list.scss";

export type CollapsibleDataListEntry = {
  label: string;
  value: ReactNode;
};

export type CollapsibleDataListProps = {
  id: string;
  date?: string;
  title?: string;
  subTitle?: string;
  data: CollapsibleDataListEntry[];
  hideEmpty?: boolean;
};

export const CollapsibleDataList = ({
  id,
  date,
  title,
  subTitle,
  data,
  hideEmpty,
}: CollapsibleDataListProps) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-collapsible-data-list ctw-space-y-1">
      <DetailSummary
        date={date}
        title={title}
        subTitle={subTitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <Details data={data} hideEmpty={hideEmpty} />}
    </div>
  );
};

const DetailSummary = ({
  date,
  title,
  subTitle,
  isDetailShown,
  setIsDetailShown,
}: {
  date?: string;
  title?: string;
  subTitle?: string;
  isDetailShown: boolean;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button
    type="button"
    onClick={() => setIsDetailShown(!isDetailShown)}
    className="ctw-w-full ctw-cursor-pointer ctw-border-none ctw-bg-transparent ctw-p-0 ctw-text-base ctw-outline-none"
  >
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark">
      <div className="ctw-flex ctw-space-x-3">
        {date && <div className="ctw-min-w-[5rem]">{date}</div>}
        <div>
          <div className="ctw-font-semibold ctw-text-content-black">
            {title}
          </div>
          <div className="ctw-text-content-light">{subTitle}</div>
        </div>
      </div>
      <div className="ctw-justify-right ctw-flex">
        <ChevronRightIcon
          className={cx("ctw-h-5 ctw-w-5 ctw-text-primary-dark", {
            "ctw-rotate-90": isDetailShown,
          })}
        />
      </div>
    </div>
  </button>
);
