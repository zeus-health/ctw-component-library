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
  subtitle?: string;
  data: CollapsibleDataListEntry[];
  hideEmpty?: boolean;
  documentButton?: ReactNode;
  binaryId?: string;
};

export const CollapsibleDataList = ({
  id,
  date,
  title,
  subtitle,
  data,
  hideEmpty,
  documentButton,
  binaryId,
}: CollapsibleDataListProps) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <div className="ctw-collapsible-data-list ctw-space-y-1">
      <DetailSummary
        date={date}
        title={title}
        subtitle={subtitle}
        isDetailShown={isDetailShown}
        setIsDetailShown={setIsDetailShown}
        binaryId={binaryId}
      />
      {isDetailShown && (
        <Details
          data={data}
          hideEmpty={hideEmpty}
          documentButton={documentButton}
          binaryId={binaryId}
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
  binaryId,
  setIsDetailShown,
}: {
  date?: string;
  title?: string;
  subtitle?: string;
  isDetailShown: boolean;
  binaryId: string | undefined;
  setIsDetailShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button
    type="button"
    aria-label="details"
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
          <div className="ctw-text-content-light">{subtitle}</div>
        </div>
      </div>
      <div className="ctw-flex ctw-items-center ctw-space-x-3">
        {binaryId && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height={16}
            className=" ctw-fill-content-light hover:ctw-fill-content-light"
          >
            <path
              d="M172 381.3C176.5 388 183.9 392 191.9 392c.5 0 1.047 0 1.547-.0313c8.547-.5313 16.16-5.594 
        19.98-13.25l43.94-87.88l9.75 17.06C271.4 315.4 279.4 320 288 320h40C341.3 320 352 309.3 352 296S341.3 
        272 328 272h-26.08l-25.08-43.91C272.5 220.4 264.7 215.8 255.3 216c-8.844 .25-16.84 5.344-20.8 13.28l-45.5 
        91L163.1 282.7C159.5 276 152 272 144 272H24C10.75 272 0 282.8 0 296S10.75 320 24 320h107.2L172 381.3zM429.3 
        93.38l-74.63-74.64C342.6 6.742 326.3 0 309.4 0H128C92.65 0 63.1 28.66 64 64l.0059 152c.002 13.26 10.75 24 24 
        24s24-10.75 24-24L112 64.13c0-8.836 7.162-16 16-16h160L288 128c0 17.67 14.33 32 32 32h79.1v288c0 8.836-7.164 
        16-16 16H128c-8.836 0-16-7.164-16-16l-.0039-72c0-13.26-10.74-24-23.1-24s-24 10.74-24 24L64.01 448c.002 35.34 
        28.65 64 64 64H384c35.2 0 64-28.8 64-64V138.6C448 121.7 441.3 105.4 429.3 93.38z"
            />
          </svg>
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
