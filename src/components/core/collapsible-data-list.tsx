import { ChevronRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { ReactNode, useState } from "react";

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
};

export const CollapsibleDataList = ({
  id,
  date,
  title,
  subTitle,
  data,
}: CollapsibleDataListProps) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-divide-gray-200 ctw-sbg-white ctw-divide-y ctw-p-0">
      <DetailSummary
        date={date}
        title={title}
        subTitle={subTitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <Details id={id} data={data} />}
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
  <div className="ctw-flex ctw-justify-between ctw-divide-y ctw-bg-bg-lighter ctw-p-4">
    <div className="ctw-flex-column ctw-flex ctw-space-x-3">
      <div className="ctw-text-gray-900 ctw-flex ctw-items-baseline ctw-space-x-4">
        {date}
      </div>
      <div>
        <div className="ctw-flex ctw-space-x-4 ctw-text-primary-dark">
          {title}
        </div>
        <div>{subTitle}</div>
      </div>
    </div>
    <div className="ctw-justify-right ctw-flex">
      <ChevronRightIcon
        className={cx("ctw-h-5 ctw-w-5 ctw-text-primary-dark", {
          "ctw-rotate-90": isDetailShown,
        })}
        onClick={() => setIsDetailShown(!isDetailShown)}
      />
    </div>
  </div>
);

const Details = ({
  id,
  data,
}: {
  id: string;
  data: CollapsibleDataListEntry[];
}) => (
  <div className="ctw-divide-y ctw-rounded-lg ctw-border ctw-bg-bg-lighter">
    <dl className="ctw-space-y-2 ctw-p-4">
      <div className="ctw-text-sm"> Details </div>
      {data.map(({ label, value }) => {
        if (value) {
          return (
            <div
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
