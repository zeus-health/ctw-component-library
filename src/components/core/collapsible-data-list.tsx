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
    <div>
      <DetailSummary
        date={date}
        title={title}
        subTitle={subTitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
      />
      {isDetailShown && <Details data={data} />}
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
    <div className="ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-lighter ctw-p-3 ctw-text-left">
      <div className="ctw-flex ctw-space-x-3">
        <div className="ctw-min-w-[5rem]">{date}</div>
        <div>
          <div className="ctw-text-primary-dark">{title}</div>
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

const Details = ({ data }: { data: CollapsibleDataListEntry[] }) => (
  <div className="ctw-rounded-lg ctw-bg-bg-lighter">
    <dl className="ctw-space-y-2 ctw-p-4">
      <div className="ctw-text-sm ctw-text-content-light">Details</div>
      {data
        .filter((d) => d.value || d.value === 0)
        .map(({ label, value }) => (
          <div
            key={label}
            className="ctw-text-gray-900 ctw-flex ctw-items-baseline"
          >
            <dt className="ctw-w-1/3 ctw-flex-shrink-0 ctw-font-medium">
              {label}
            </dt>
            <dd className="ctw-m-0">{value}</dd>
          </div>
        ))}
    </dl>
  </div>
);
