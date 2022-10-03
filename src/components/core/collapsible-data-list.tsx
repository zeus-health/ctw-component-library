import { ChevronRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useState } from "react";
import { DataListStackEntry } from "./condition-history-list";

export const CollapsibleDataList = ({
  id,
  date,
  title,
  subTitle,
  data,
}: DataListStackEntry) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y ctw-p-0">
      <DetailSummary
        date
        title
        subTitle
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <Details id data />}
    </div>
  );
};

const DetailSummary = ({
  date,
  title,
  subTitle,
  isDetailShown,
  setIsDetailShown,
}: any) => (
  <div className="ctw-flex ctw-divide-y ctw-bg-bg-lighter">
    <div className="ctw-flex-column ctw-flex">
      <div className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4">
        {date}
      </div>
      <div>{title}</div>
      <div>{subTitle}</div>
    </div>
    <div className="ctw-justify-right ctw-flex">
      <ChevronRightIcon
        className={cx("ctw-h-5 ctw-w-5", !isDetailShown ? "" : "ctw-rotate-90")}
        onClick={() => setIsDetailShown(!isDetailShown)}
      />
    </div>
  </div>
);

const Details = ({ id, data }: any) => (
  <div className="ctw-divide-y ctw-rounded-lg ctw-border">
    <dl className="ctw-space-y-2 ctw-p-4" key={id}>
      <div> Details </div>
      {data.map(({ label, value }) => {
        if (value) {
          return (
            <div
              // label is not guarenteed to be unique so append index.
              // eslint-disable-next-line react/no-array-index-key
              key={label}
              className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4"
            >
              <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
                {label}
              </dt>
              <dd className="ctw-flex-grow">{value}</dd>
            </div>
          );
        }
        return <div />;
      })}
    </dl>
  </div>
);
